import { createStore, useStore } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { MessageTypes, sendMessage } from "../";

import {
	queryAllSearchEngine,
	createSearchEngine,
	getCurrentSearchEngine,
	getSearchEngineById,
	deleteSearchEngine,
	updateSearchEngineById,
	SearchEngine,
	CreateSearchEngineParams,
	ID,
	defaultSearchEngines,
	equality
} from "..";


let initValue = await queryAllSearchEngine()
if (initValue.length === 0) {
	const promises = defaultSearchEngines.map(async (item) => {
		await createSearchEngine(item)
	})
	await Promise.all(promises)
}
initValue = await queryAllSearchEngine()

let initSearchEngine = await getCurrentSearchEngine()
if (!initSearchEngine) {
	const first = initValue[0]
	await updateSearchEngineById(first.id, { ...first, selected: 1 })
}
initSearchEngine = await getCurrentSearchEngine() as SearchEngine



type State = {
	searchEngines: SearchEngine[],
	currentEngine: SearchEngine,
	loadingSearchEngines: boolean,
}

type Action = {
	createSearchEngine: (params: CreateSearchEngineParams) => void;
	getSearchEngines: () => Promise<void>;
	deleteSearchEngine: (id: ID) => Promise<void>;
	getSearchEngineById: (id: ID) => Promise<SearchEngine | undefined>;
	updateSearchEngine: (params: SearchEngine) => Promise<void>;
	setCurrentEngine: (id: ID) => Promise<void>;
	refresh: () => Promise<void>
}



type SearchEnginesStore = State & Action
export const searchEnginesStore = createStore<SearchEnginesStore>()(subscribeWithSelector((set, get) => {
	return ({
		searchEngines: initValue,
		currentEngine: initSearchEngine,
		loadingSearchEngines: false,
		createSearchEngine: async (params) => {
			await createSearchEngine(params)
			const list = await queryAllSearchEngine()
			set({ searchEngines: list })
		},
		setCurrentEngine: async (id) => {
			const currentEngine = get().currentEngine
			await updateSearchEngineById(currentEngine.id, { ...currentEngine, selected: 0 })
			const nextSelected = await getSearchEngineById(id) as SearchEngine
			await updateSearchEngineById(id, { ...nextSelected, selected: 1 })
			const next = await getCurrentSearchEngine()
			set({ currentEngine: next })
		},
		refresh: async () => {
			const list = queryAllSearchEngine()
			const current = getCurrentSearchEngine()
			const [searchEngines, currentEngine] = await Promise.all([list, current])
			set({ searchEngines, currentEngine })
		},

		getSearchEngines: async () => {
			set({ loadingSearchEngines: true })
			const list = await queryAllSearchEngine()
			set({ searchEngines: [...list], loadingSearchEngines: false })
		},
		getSearchEngineById: async (id: ID) => {
			const result = await getSearchEngineById(id)
			return result
		},
		deleteSearchEngine: async (id) => {
			await deleteSearchEngine(id)
			const list = await queryAllSearchEngine()
			set({ searchEngines: list })
		},
		updateSearchEngine: async (params) => {
			await updateSearchEngineById(params.id, params)
			const list = await queryAllSearchEngine()
			set({ searchEngines: list })
		}
	})
}))

export const useSearchEnginesStore = () => {
	const { searchEngines: _searchEngines, currentEngine: _currentEngine, loadingSearchEngines: _loadingSearchEngines, ...others } = searchEnginesStore.getState()
	const searchEngines = useStore(searchEnginesStore, state => state.searchEngines)
	const currentEngine = useStore(searchEnginesStore, state => state.currentEngine)
	const loadingSearchEngines = useStore(searchEnginesStore, state => state.loadingSearchEngines)
	return {
		searchEngines, loadingSearchEngines, currentEngine, ...others
	}
}

async function subscribeSearchEngine() {
	await sendMessage({ method: MessageTypes.updateSearchEngines })
}


async function handlerMessage(request: any, sender: chrome.runtime.MessageSender, response: Function) {
	const { method } = request;
	switch (method) {
		case MessageTypes.updateSearchEngines:
			await searchEnginesStore.getState().refresh()
			break;
		case MessageTypes.updateCurrentEngin:
			await searchEnginesStore.getState().refresh()
		default:
			break;
	}
}

chrome.runtime.onMessage.addListener(handlerMessage);
const unsubscribeList = searchEnginesStore.subscribe((state) => state.searchEngines, subscribeSearchEngine, {
	equalityFn: equality
})
window.addEventListener('beforeunload', unsubscribeList)

const unsubscribeSelected = searchEnginesStore.subscribe((state) => state.currentEngine, subscribeSearchEngine, {
	equalityFn: equality
})
window.addEventListener('beforeunload', unsubscribeSelected)
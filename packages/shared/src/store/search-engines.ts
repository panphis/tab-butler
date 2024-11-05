import { createStore, create, useStore } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import { MessageTypes, sendMessage } from "../";

import {
	queryAllSearchEngine, createSearchEngine, getSearchEngineById, deleteSearchEngine, updateSearchEngineById,
	SearchEngine, CreateSearchEngineParams, ID,
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

type State = {
	searchEngines: SearchEngine[],
	loadingSearchEngines: boolean,
}

type Action = {
	createSearchEngine: (params: CreateSearchEngineParams) => void;
	getSearchEngines: () => Promise<void>;
	deleteSearchEngine: (id: ID) => Promise<void>;
	getSearchEngineById: (id: ID) => Promise<SearchEngine | undefined>;
	updateSearchEngine: (params: SearchEngine) => Promise<void>;
}



type SearchEnginesStore = State & Action
export const searchEnginesStore = createStore<SearchEnginesStore>()(subscribeWithSelector((set) => {
	return ({
		searchEngines: initValue,
		loadingSearchEngines: false,
		createSearchEngine: async (params) => {
			await createSearchEngine(params)
			const list = await queryAllSearchEngine()
			set({ searchEngines: list })
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
	const { searchEngines: _searchEngines, ...others } = searchEnginesStore.getState()
	const searchEngines = useStore(searchEnginesStore, state => state.searchEngines)
	return {
		searchEngines, ...others
	}
}

async function subscribeSearchEngine() {
	await sendMessage({ method: MessageTypes.updateSearchEngines })
}


async function handlerMessage(request: any, sender: chrome.runtime.MessageSender, response: Function) {
	const { method } = request;
	switch (method) {
		case MessageTypes.updateSearchEngines:
			await searchEnginesStore.getState().getSearchEngines()
			break;
		default:
			break;
	}
}

chrome.runtime.onMessage.addListener(handlerMessage);
const unsubscribe = searchEnginesStore.subscribe((state) => state.searchEngines, subscribeSearchEngine, {
	equalityFn: equality
})

window.addEventListener('beforeunload', unsubscribe)
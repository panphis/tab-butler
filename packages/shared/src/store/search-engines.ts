import { createStore } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import {
	queryAllSearchEngine, createSearchEngine, getSearchEngineById, deleteSearchEngine, updateSearchEngineById,
	SearchEngine, CreateSearchEngineParams, ID,
	defaultSearchEngines
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
	getSearchEngines: () => void;
	deleteSearchEngine: (id: ID) => void;
	getSearchEngineById: (id: ID) => Promise<SearchEngine | undefined>;
	updateSearchEngine: (params: SearchEngine) => void;
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
			set({ searchEngines: list, loadingSearchEngines: false })
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

function subscribeSearchEngine() {
	console.log('subscribeSearchEngine')
	searchEnginesStore.getState().getSearchEngines()
}

function equalityFn(pre: any, next: any): boolean {    // 判断是否是同一个对象
	if (pre === next) {
		return true;
	}

	// 判断是否是对象
	if (typeof pre === 'object' && pre !== null && typeof next === 'object' && next !== null) {
		// 判断对象的键的数量是否相同
		if (Object.keys(pre).length !== Object.keys(next).length) {
			return false;
		}

		// 递归比较对象的每个键值对
		for (let key in pre) {
			if (next.hasOwnProperty(key)) {
				if (!equalityFn(pre[key], next[key])) {
					return false;
				}
			} else {
				return false;
			}
		}

		return true;
	} else if (Array.isArray(pre) && Array.isArray(next)) {
		// 判断是否是数组
		if (pre.length !== next.length) {
			return false;
		}

		// 递归比较数组的每个元素
		for (let i = 0; i < pre.length; i++) {
			if (!equalityFn(pre[i], next[i])) {
				return false;
			}
		}

		return true;
	}

	// 其他情况
	return false;
}


const unsubscribe = searchEnginesStore.subscribe((state) => state.searchEngines, subscribeSearchEngine, {
	equalityFn: equalityFn
})

window.addEventListener('unload', () => {
	unsubscribe()
})

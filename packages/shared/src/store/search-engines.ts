import { create } from 'zustand'

import {
	queryAllSearchEngine, createSearchEngine, getSearchEngineById, deleteSearchEngine, updateSearchEngineById,
	SearchEngine, CreateSearchEngineParams, ID,
	defaultSearchEngines
} from "..";

type State = {
	searchEngines: SearchEngine[],
	loadingSearchEngines: boolean,
}

type Action = {
	createSearchEngines: (params: CreateSearchEngineParams) => void;
	getSearchEngines: () => void;
	deleteSearchEngine: (id: ID) => void;
	getSearchEngineById: (id: ID) => Promise<SearchEngine | undefined>;
	updateSearchEngine: (params: SearchEngine) => void;
}



let initValue = await queryAllSearchEngine()
if (initValue.length === 0) {
	const promises = defaultSearchEngines.map(async (item) => {
		await createSearchEngine(item)
	})
	await Promise.all(promises)
}
initValue = await queryAllSearchEngine()

export const useSearchEngines = create<State & Action>((set) => {
	return ({
		searchEngines: initValue,
		loadingSearchEngines: false,
		createSearchEngines: async (params) => {
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
})
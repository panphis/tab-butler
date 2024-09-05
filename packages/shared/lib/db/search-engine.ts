

import { CreateSearchEngineParams, ID } from "../";
import { storeSearchEngineName, db, } from "./";



export const createSearchEngine = async (searchEngine: CreateSearchEngineParams) => {
	return await db.add(storeSearchEngineName, searchEngine)
}

export const queryAllSearchEngine = async () => {
	return await db.getAll(storeSearchEngineName)
}

export const getSearchEngineById = async (id: ID) => {
	const result = await db.get(storeSearchEngineName, id)
	return result
}

export const updateSearchEngineById = async (id: ID, params: CreateSearchEngineParams) => {
	return await db.put(storeSearchEngineName, { id, ...params })
}

export const deleteSearchEngine = async (id: ID) => {
	return await db.delete(storeSearchEngineName, id)
}




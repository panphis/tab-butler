

import { CreateSearchEngineParams, ID } from "../";

import { searchEngineDB } from "./";


export const createSearchEngine = (searchEngine: CreateSearchEngineParams) => {
	return searchEngineDB.add(searchEngine)
}

export const queryAllSearchEngine = () => {
	return searchEngineDB.toArray()
}

export const getSearchEngineById = async (id: ID) => {
	const result = searchEngineDB.get(id)
	return result
}

export const updateSearchEngineById = async (id: ID, params: CreateSearchEngineParams) => {
	return searchEngineDB.update(id, { ...params })
}

export const deleteSearchEngine = async (id: ID) => {
	return searchEngineDB.delete(id)
}




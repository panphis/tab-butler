import { ID } from "."
export interface CreateSearchEngineParams {

	title: string
	url: string
}


export interface SearchEngine {
	id: ID
	title: string
	url: string
}
import { ID } from "./common"
export interface CreateSearchEngineParams {

	title: string
	url: string
}


export interface SearchEngine {
	id: ID
	title: string
	url: string,
	supportIgnore: boolean
	ignoreKeyStr?: string
}
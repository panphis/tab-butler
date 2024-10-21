import { ID } from "."


export interface CreateWebSiteParams {
	title: string
	file: File
	selected: number,
	createdAt: Date
}


export interface WebSite extends CreateWebSiteParams {
	id: ID
}

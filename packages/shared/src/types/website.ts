import { ID } from "."

export interface CreateWebSiteParams {
	url: string,
	title: string,
	createdAt: Date
}

export interface WebSite extends CreateWebSiteParams {
	id: ID
}


import {
	CreateWebSiteParams,
	ID
} from "@/type";
import { websiteDB } from ".";



export const createOrUpdateWebSite = async (website: CreateWebSiteParams) => {
	const preSite = await websiteDB.where({ url: website.url }).first()
	if (preSite) {
		await updateWebSiteById(preSite.id, website)
	} else {
		const params = { ...website }
		await websiteDB.add(params)
	}
}

export const queryAllWebSite = () => {
	return websiteDB.orderBy('createdAt').reverse().toArray()
}

export const getWebSiteById = (id: ID) => {
	const result = websiteDB.get(id)
	return result
}

export const updateWebSiteById = (id: ID, params: CreateWebSiteParams) => {
	return websiteDB.update(id, { ...params })
}

export const deleteWebSite = (id: ID) => {
	return websiteDB.delete(id)
}


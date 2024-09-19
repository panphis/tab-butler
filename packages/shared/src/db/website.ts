

import {
	CreateWebSiteParams,
	ID
} from "../types";
import { websiteDB } from ".";



export const createWebSite = async (website: CreateWebSiteParams) => {
	const params = { ...website, createdAt: new Date() }
	await websiteDB.add(params)
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


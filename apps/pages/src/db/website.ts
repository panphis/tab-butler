

import {
	CreateWebSiteParams,
	ID,
	WebSite
} from "@/type";
import { websiteDB } from ".";



export const createOrUpdateWebSite = async (website: CreateWebSiteParams) => {
	const preSite = await websiteDB.where({ url: website.url }).first()
	if (preSite) {
		await updateWebSiteById(preSite.id, website)
	} else {

		const maxValue = await websiteDB.orderBy('index').last();
		const newxInde = maxValue ? (maxValue?.index ?? 0) + 1 : 1;
		const params = { ...website, index: newxInde }
		// 如何保证新建的时候 新插入的这条数据 index 自增
		await websiteDB.add(params)
	}
}

export const queryAllWebSite = () => {
	return websiteDB.orderBy('index').reverse().toArray()
}
export const reorderWebSite = async (websites: WebSite[]) => {
	// 更新数据库中的顺序
	await websiteDB.bulkPut(websites, { allKeys: true });
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


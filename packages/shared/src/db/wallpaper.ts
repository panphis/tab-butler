

import {
	CreateWallpaperParams,
	ID
} from "@/types";
import { wallpaperDB } from "./";



export const createWebSite = async (wallpaper: CreateWallpaperParams) => {
	const preSelected = await wallpaperDB.where('selected').equals(1)
	await preSelected.modify({ selected: 0 })
	const params = { ...wallpaper, selected: 1, createdAt: new Date() }
	await wallpaperDB.add(params)
}

export const queryAllWebSite = () => {
	return wallpaperDB.orderBy('createdAt').reverse().toArray()
}

export const getWallpaperById = (id: ID) => {
	const result = wallpaperDB.get(id)
	return result
}

export const updateWallpaperById = (id: ID, params: CreateWallpaperParams) => {
	return wallpaperDB.update(id, { ...params })
}

export const deleteWebSite = (id: ID) => {
	return wallpaperDB.delete(id)
}

export const getCurrentWallpaper = () => {
	return wallpaperDB.where({
		selected: 1
	}).first()
}


export const setCurrentWallpaper = async (id: ID) => {
	const preSelected = await wallpaperDB.where('selected').equals(1)
	await preSelected.modify({ selected: 0 })
	wallpaperDB.update(id, { selected: 1 })
}



import {
	CreateWallpaperParams,
	ID
} from "../";
import { storeWallpaperDBName, db } from "./";



export const createWallpaper = async (wallpaper: CreateWallpaperParams) => {
	// const { title, file } = wallpaper
	const result = await db.add(storeWallpaperDBName, wallpaper)
	console.log(result)
}

export const queryAllWallpaper = async () => {
	return await db.getAll(storeWallpaperDBName)
}

export const getWallpaperById = async (id: ID) => {
	const result = await db.get(storeWallpaperDBName, id)
	return result
}

export const updateWallpaperById = async (id: ID, params: CreateWallpaperParams) => {
	return await db.put(storeWallpaperDBName, { id, ...params })
}

export const deleteWallpaper = async (id: ID) => {
	return await db.delete(storeWallpaperDBName, id)
}




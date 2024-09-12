

import {
	CreateWallpaperParams,
	ID
} from "@/types";
import { wallpaperDB } from "./";



export const createWallpaper = (wallpaper: CreateWallpaperParams) => {
	// const { title, file } = wallpaper
	const result = wallpaperDB.add(wallpaper)
	console.log(result)
}

export const queryAllWallpaper = () => {
	return wallpaperDB.toArray()
}

export const getWallpaperById = (id: ID) => {
	const result = wallpaperDB.get(id)
	return result
}

export const updateWallpaperById = (id: ID, params: CreateWallpaperParams) => {
	return wallpaperDB.update(id, { ...params })
}

export const deleteWallpaper = (id: ID) => {
	return wallpaperDB.delete(id)
}




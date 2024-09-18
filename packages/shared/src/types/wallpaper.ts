import { ID } from "."


export interface CreateWallpaperParams {
	title: string
	file: File
	selected: number,
	createdAt: Date
}


export interface Wallpaper extends CreateWallpaperParams {
	id: ID
}


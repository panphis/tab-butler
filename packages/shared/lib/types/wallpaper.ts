import { ID } from "."


export interface CreateWallpaperParams {
	title: string
	file: File
}


export interface Wallpaper extends CreateWallpaperParams {
	id: ID
}


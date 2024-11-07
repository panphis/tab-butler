import { ID } from "."


export interface CreateWallpaperParams {
	title: string
	file: File
	poster: File,
	type: string,
	width: number | undefined;
	height: number | undefined;
	selected?: number,
	createdAt?: Date
}

export interface Wallpaper extends CreateWallpaperParams {
	id: ID
}

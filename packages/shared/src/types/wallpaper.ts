import { ID } from "."


export interface CreateWallpaplerParams {
	title: string
	file: File
	selected?: number,
	createdAt?: Date
}


export interface Wallpaper extends CreateWallpaplerParams {
	id: ID
}

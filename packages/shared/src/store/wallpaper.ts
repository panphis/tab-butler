import { create } from 'zustand'

import {
	createWallpaper, queryAllWallpaper,
	getWallpaperById, updateWallpaperById,
	deleteWallpaper, Wallpaper, CreateWallpaperParams, ID
} from "../";


type State = {
	currentWallpaper: null | ID,
	wallpapers: Wallpaper[],
	loadingWallpapers: boolean,
}




type Action = {
	createWallpaper: (params: CreateWallpaperParams) => void;
	getWallpapers: () => void;
	removeWallpaper: (id: ID) => void;
	setWallpaper: (id: ID) => void;
	getWallpaper: (id: ID) => void;
}

const initValue = await queryAllWallpaper()

export const useWallpaperStore = create<State & Action>((set) => ({
	wallpapers: initValue,
	loadingWallpapers: false,
	currentWallpaper: null,

	createWallpaper: async (params) => {
		await createWallpaper(params)
		const list = await queryAllWallpaper()
		set({ wallpapers: list })
	},

	getWallpapers: async () => {
		set({ loadingWallpapers: true })
		const list = await queryAllWallpaper()
		set({ wallpapers: list, loadingWallpapers: false })
	},

	removeWallpaper: async (id) => {
		await deleteWallpaper(id)
		const list = await queryAllWallpaper()
		set({ wallpapers: list })
	},

	setWallpaper: async (id) => {
		set({ currentWallpaper: id })
	},


	getWallpaper: async () => {
		const currentWallpaperID = useWallpaperStore.getState().currentWallpaper
		if (!currentWallpaperID) {
			return
		}
		return await getWallpaperById(currentWallpaperID)
	},

}))


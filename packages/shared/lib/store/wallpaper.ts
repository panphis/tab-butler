import { create } from 'zustand'

import {
	createWallpaper, queryAllWallpaper,
	// queryWallpaperById, updateWallpaperById, 
	deleteWallpaper, Wallpaper, CreateWallpaperParams, ID
} from "../";


type State = {
	wallpapers: Wallpaper[],
	loadingWallpapers: boolean,
}

type Action = {
	createWallpaper: (params: CreateWallpaperParams) => void;
	getWallpapers: () => void;
	removeWallpaper: (id: ID) => void;
}


const initValue = await queryAllWallpaper()

export const useWallpaperStore = create<State & Action>((set) => ({
	wallpapers: initValue,
	loadingWallpapers: false,

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
	}
}))


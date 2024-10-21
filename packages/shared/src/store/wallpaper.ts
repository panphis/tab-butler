import { create } from 'zustand'

import {
	createWallpaper, queryAllWallpaper,
	getWallpaperById, updateWallpaperById, getCurrentWallpaper,
	deleteWallpaper, Wallpaper, CreateWallpaperParams, ID,
	setCurrentWallpaper
} from "../";


type State = {
	currentWallpaper: undefined | Wallpaper,
	wallpapers: Wallpaper[],
	loadingWallpapers: boolean,
}




type Action = {
	createWallpaper: (params: CreateWallpaperParams) => void;
	getWallpapers: () => void;
	removeWallpaper: (id: ID) => void;
	setCurrentWallpaper: (id: ID) => void;
	getWallpaper: (id: ID) => void;
	getCurrentWallpaper: () => Promise<Wallpaper | undefined>;
}

const initValue = await queryAllWallpaper()
const currentWallpaper = await getCurrentWallpaper()

export const useWallpaperStore = create<State & Action>((set, get) => ({
	wallpapers: initValue,
	loadingWallpapers: false,
	currentWallpaper,

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

	setCurrentWallpaper: async (id) => {
		await setCurrentWallpaper(id)
		const { getWallpapers, getCurrentWallpaper } = get()
		const currentWallpaper = await getCurrentWallpaper()
		set({ currentWallpaper })
		getWallpapers()
	},


	getWallpaper: async (id) => {
		return await getWallpaperById(id)
	},

	getCurrentWallpaper: async () => {
		const wallpaper = await getCurrentWallpaper()
		set({ currentWallpaper: wallpaper })
		return wallpaper
	}

}))


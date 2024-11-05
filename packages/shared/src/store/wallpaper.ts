import { create, createStore, useStore } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import {
	createWallpaper, queryAllWallpaper,
	getWallpaperById, updateWallpaperById, getCurrentWallpaper,
	deleteWallpaper, Wallpaper, CreateWallpaperParams, ID,
	setCurrentWallpaper,
	MessageTypes,
	sendMessage,
	equality
} from "../";


type State = {
	currentWallpaper: undefined | Wallpaper,
	wallpapers: Wallpaper[],
	loadingWallpapers: boolean,
}




type Action = {
	createWallpaper: (params: CreateWallpaperParams) => Promise<void>;
	updateWallpaper: (params: Wallpaper) => Promise<void>;
	getWallpapers: () => Promise<void>;
	removeWallpaper: (id: ID) => Promise<void>;
	setCurrentWallpaper: (id: ID) => Promise<void>;
	getWallpaper: (id: ID) => Promise<Wallpaper | undefined>;
	getCurrentWallpaper: () => Promise<Wallpaper | undefined>;
	refresh: () => Promise<void>;
}

const initValue = await queryAllWallpaper()
const currentWallpaper = await getCurrentWallpaper()


type WallpaperStore = State & Action
export const wallpaperStore = createStore<WallpaperStore>()(subscribeWithSelector((set, get) => {
	return {
		wallpapers: initValue,
		loadingWallpapers: false,
		currentWallpaper,

		createWallpaper: async (params) => {
			await createWallpaper(params)
			const list = await queryAllWallpaper()
			set({ wallpapers: list })
		},
		updateWallpaper: async (params) => {
			const { id, ...others } = params
			await updateWallpaperById(id, others)
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
			return await getWallpaperById(id)!
		},

		getCurrentWallpaper: async () => {
			const wallpaper = await getCurrentWallpaper()
			set({ currentWallpaper: wallpaper })
			return wallpaper
		},


		refresh: async () => {
			const list = queryAllWallpaper()
			const wallpaper = getCurrentWallpaper()
			const [currentWallpaper, wallpapers] = await Promise.all([wallpaper, list])
			set({ currentWallpaper, wallpapers })

		}
	}
}))


async function handlerMessage(request: any, sender: chrome.runtime.MessageSender, response: Function) {
	const { method } = request;
	switch (method) {
		case MessageTypes.updateCurrentWallpaper:
			await wallpaperStore.getState().refresh()
			break;
		default:
			break;
	}
}
export const useWallpaperStore = () => {
	const {
		wallpapers: _wallpapers,
		loadingWallpapers: _loadingWallpapers,
		currentWallpaper: _currentWallpaper,
		...others } = wallpaperStore.getState()
	const wallpapers = useStore(wallpaperStore, state => state.wallpapers)
	const loadingWallpapers = useStore(wallpaperStore, state => state.loadingWallpapers)
	const currentWallpaper = useStore(wallpaperStore, state => state.currentWallpaper)
	return {
		wallpapers, loadingWallpapers, currentWallpaper, ...others
	}
}

async function subscribeSearchEngine() {
	await sendMessage({ method: MessageTypes.updateCurrentWallpaper })
}

chrome.runtime.onMessage.addListener(handlerMessage);
const unsubscribeList = wallpaperStore.subscribe((state) => state.currentWallpaper, subscribeSearchEngine, {
	equalityFn: equality
})
window.addEventListener('beforeunload', unsubscribeList)

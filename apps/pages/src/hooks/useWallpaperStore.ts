import { createWallpaper, deleteWallpaper, getCurrentWallpaper, getWallpaperById, queryAllWallpaper, setCurrentWallpaper, updateWallpaperById } from '@/db';
import { CreateWallpaperParams, ID, Wallpaper } from '@/type';
import { equality, MessageTypes, sendMessage } from '@/utils';
import { create, createStore, useStore } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'




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
			const { getWallpapers } = get()
			await setCurrentWallpaper(id)
			const currentWallpaper = await getCurrentWallpaper()
			set({ currentWallpaper })
			getWallpapers()
		},


		getWallpaper: async (id) => {
			return await getWallpaperById(id)!
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

async function subscribeUpdateWallpaper() {
	await sendMessage({ method: MessageTypes.updateCurrentWallpaper })
}

chrome.runtime.onMessage.addListener(handlerMessage);
const unsubscribe = wallpaperStore.subscribe((state) => state.currentWallpaper?.id, subscribeUpdateWallpaper, {
	equalityFn: equality
})
window.addEventListener('beforeunload', unsubscribe)

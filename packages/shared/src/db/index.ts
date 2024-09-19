

export { dbName, searchEngineDB, wallpaperDB, dbVersion, websiteDB } from "./db"
export {
	queryAllWebSite as queryAllWallpaper,
	createWebSite as createWallpaper,
	deleteWebSite as deleteWallpaper,
	getWallpaperById,
	updateWallpaperById,
	getCurrentWallpaper,
	setCurrentWallpaper
} from "./wallpaper"

export {
	createSearchEngine, updateSearchEngineById,
	deleteSearchEngine, getSearchEngineById, queryAllSearchEngine
} from './search-engine'

export { createWebSite, queryAllWebSite, updateWebSiteById, deleteWebSite, } from "./website"




export { dbName, searchEngineDB, wallpaperDB, dbVersion, websiteDB } from "./db"
export {
	queryAllWebSite as queryAllWallpaper,
	createOrUpdateWebSite as createWallpaper,
	deleteWebSite as deleteWallpaper,
	getWallpaperById,
	updateWallpaperById,
	getCurrentWallpaper,
	setCurrentWallpaper
} from "./wallpaper"

export {
	createSearchEngine, updateSearchEngineById,
	deleteSearchEngine, getSearchEngineById, queryAllSearchEngine, getCurrentSearchEngine
} from './search-engine'

export { createOrUpdateWebSite as createOrUpdateWebSite, queryAllWebSite, updateWebSiteById, deleteWebSite, } from "./website"


export {
	dbVersion, dbName, searchEngineDB, wallpaperDB,

	queryAllWallpaper,
	createWallpaper,
	deleteWallpaper,
	getWallpaperById,
	updateWallpaperById,
	getCurrentWallpaper,
	setCurrentWallpaper,

	createSearchEngine,
	getCurrentSearchEngine,
	updateSearchEngineById,
	deleteSearchEngine,
	getSearchEngineById,
	queryAllSearchEngine,

	createOrUpdateWebSite, queryAllWebSite, updateWebSiteById, deleteWebSite,
} from './db';

export { withSuspense, withErrorBoundary } from './hoc';

export { useBookMarkQuery, useBookMarks, useHistory, useStorage, useStorageSuspense, useTopSites, useCopy } from './hooks';


export { useWallpaperStore, searchEnginesStore, useSearchEnginesStore, useWebSiteStore } from './store';

export { formatFileSize, Duration, themesEnum, copy, defaultSearchEngines, equality, sendMessage, MessageTypes } from "./utils"


export {
	createStorage, StorageType, SessionAccessLevel,
	colorStorage, radiusStorage, themeStorage
} from "./storage"


export type {
	ID,
	Wallpaper, CreateWallpaperParams,
	CreateSearchEngineParams, SearchEngine,
	// stores
	BaseStorage, ValueOrUpdate, Themes,
	CreateWebSiteParams, WebSite,
	BookmarkTreeNode,
	MostVisitedURL,
	HistoryItem,
	BookmarkDestinationArg,
	BookmarkChangesArg,
	BookmarkCreateArg,
	ContextMenusCreateProperties,
	Tab,
	TabsCreateProperties,
	TabQueryInfo,
	HistoryUrl
} from './types';






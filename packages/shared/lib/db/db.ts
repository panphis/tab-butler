

import { openDB } from "idb";

export const dbName = 'indexed_db'


export const storeSearchEngineName = 'searchEngine'
export const storeWallpaperDBName = 'wallpaper'

const tableNames = [storeSearchEngineName, storeWallpaperDBName]



const dbVersion = 1;

const dbInstance = openDB(dbName, dbVersion, {
	upgrade(db) {
		// 如果数据库不存在，则创建一个 objectStore
		console.log('dbInstance', db)
		tableNames.forEach(name => {
			if (!db.objectStoreNames.contains(name)) {
				db.createObjectStore(name, {
					keyPath: 'id',
					autoIncrement: true
				});
			}
		})
	},
});

export const db = await dbInstance


import { Wallpaper, SearchEngine, WebSite } from "@/type";
import Dexie, { type EntityTable } from 'dexie';

export const dbName = 'indexed_db'

export const dbVersion = 1;

interface DexieType extends Dexie {
	searchEngine: EntityTable<SearchEngine, 'id'>;
	wallpaper: EntityTable<Wallpaper, 'id'>;
	website: EntityTable<WebSite, 'id'>;
}


const db = new Dexie(dbName) as DexieType;

db.version(dbVersion).stores({
	wallpaper: "++id, title, selected, type, createdAt",
	searchEngine: "++id, title, url, selected",
	website: '++id, url, title, createdAt',
});


export const { searchEngine: searchEngineDB, wallpaper: wallpaperDB, website: websiteDB } = db





import { Wallpaper, SearchEngine } from "@/types";
import Dexie, { type EntityTable } from 'dexie';

export const dbName = 'indexed_db'

export const dbVersion = 1;

interface DexieType extends Dexie {
	searchEngine: EntityTable<SearchEngine, 'id'>;
	wallpaper: EntityTable<Wallpaper, 'id'>;
}





const db = new Dexie(dbName) as DexieType;

db.version(dbVersion).stores({
	wallpaper: "++id, title",
	searchEngine: "++id, title, url",
});


export const { searchEngine: searchEngineDB, wallpaper: wallpaperDB } = db



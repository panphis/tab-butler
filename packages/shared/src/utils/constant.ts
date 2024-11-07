import { CreateSearchEngineParams, Themes } from "../types";


export const defaultSearchEngines: CreateSearchEngineParams[] = [
	{
		url: 'https://www.google.com/search?q=',
		title: 'Google'
	},
	{
		url: 'https://bing.com/search?q=',
		title: 'Bing'
	},
	{
		url: 'https://cn.bing.com/search?q=',
		title: '必应',
	}
]

export const themesEnum: Record<Themes, Themes> = {
	light: "light",
	dark: "dark",
	system: "system",
};

export const languages = ["en-US", "zh-CN"];



export enum MessageTypes {
	bookMarkClose = 'book_mark_close',
	bookMarkOpen = 'book_mark_open',
	updateSearchEngines = 'update_search_engines',
	updateCurrentEngin = 'update_current_engine',
	updateCurrentWallpaper = 'update_current_wallpaper'
}





import { CreateSearchEngineParams, Themes } from "../types";

export const defaultSearchEngines: CreateSearchEngineParams[] = [
	{
		url: 'https://www.google.com/search?q=',
		title: 'Google',
		docUrl: "https://www.google.com/advanced_search?q="
	},
	{
		url: 'https://bing.com/search?q=',
		title: 'Bing',
		docUrl: "https://support.microsoft.com/zh-cn/topic/%E9%AB%98%E7%BA%A7%E6%90%9C%E7%B4%A2%E9%80%89%E9%A1%B9-b92e25f1-0085-4271-bdf9-14aaea720930"
	},
	{
		url: 'https://cn.bing.com/search?q=',
		title: '必应',
		docUrl: "https://support.microsoft.com/zh-cn/topic/%E9%AB%98%E7%BA%A7%E6%90%9C%E7%B4%A2%E9%80%89%E9%A1%B9-b92e25f1-0085-4271-bdf9-14aaea720930"
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





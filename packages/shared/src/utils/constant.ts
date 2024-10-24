import { SearchEngine, Themes } from "../types";


export const defaultSearchEngines: SearchEngine[] = [
	{
		url: 'https://www.google.com/search?q=',
		id: 'google',
		title: 'Google',
		supportIgnore: true
	},
	{
		url: 'https://bing.com/search?q=',
		id: 'bing',
		title: 'Bing',
		supportIgnore: false,
		ignoreKeyStr: '',
	},
	{
		url: 'https://www.baidu.com/s?ie=utf-8&word=',
		id: 'baidu',
		title: '百度',
		supportIgnore: true
	}
]

export const themesEnum: Record<Themes, Themes> = {
	light: "light",
	dark: "dark",
	system: "system",
};

export const languages = ["en-US", "zh-CN"];

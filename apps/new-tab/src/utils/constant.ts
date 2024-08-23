type SearchEngine = {
	url: string
	id: string
	title: string
	supportIgnore: boolean
	ignoreKeyStr?: string
}

export const searchEngines: SearchEngine[] = [
	{
		url: 'https://www.google.com/search?q=',
		id: 'google',
		title: 'Google',
		supportIgnore: true
	},
	{
		url: 'https://cn.bing.com/search?q=',
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
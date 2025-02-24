

const translations = {
	common: {
		form_footer: {
			delete: '删除',
			cancel: '取消',
			save: '保存'
		}
	},
	new_tab: {
		search: "搜索",
		bookmark: "书签",
		history: "历史记录",
		open: "打开",
		edit: "编辑",
		unfixed: "取消固定",
		copy: "复制网址",
		remove: "移除",
		edit_website: "编辑网站",
		site_form: {
			title: "标题",
			title_placeholder: "网站标题",
			title_description: "网站显示的名称",
			url: "网址",
			url_placeholder: "网站网址",
			url_description: "网站网址",
		}
	},
	options: {
		appearance: "外观",
		theme: "主题",
		color: "颜色",
		radius: "圆角",
		wallpaper: "壁纸",
		searchEngine: "搜索引擎"
	},
	about: "关于我们",
	products: "我们的产品"
	// 添加更多的翻译...
} as const;

export default translations;
const translations = {
	common: {
		form_footer: {
			delete: '删除',
			cancel: '取消',
			save: '保存'
		},
		copied: '已复制',
		copy_failed: '复制失败',
		try_again: '再试一次',
		update: '更新',
		delete: '删除',
		cancel: '取消',
		save: '保存',
		submit: '提交',
		confirm: '确认',
		test: '测试',
	},
	new_tab: {
		search: "搜索",
		bookmark: "书签",
		history: "历史记录",
		open: "打开",
		edit: "编辑",
		fixed: '固定',
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
	bookmark_popup: {
		site_bookmark_form: {
			title: "标题",
			title_placeholder: "网站标题",
			url: "网址",
			url_placeholder: "网站网址",
			folder: "存放目录",
			folder_placeholder: "存放目录",
		}
	},
	options: {
		language: "语言",
		appearance: "外观",
		theme: "主题",
		color: "颜色",
		radius: "圆角",
		wallpaper: "壁纸",
		upload_wallpaper_form: {
			trigger: "上传壁纸",
			form_title: "上传壁纸",
			title: "标题",
			title_placeholder: "壁纸标题",
			file: "文件",
			file_placeholder: "选择文件",
			file_description: "请选择一个图片或者视频文件",
		},
		edit_wallpaper_form: {
			form_title: "更新壁纸",
		},
		no_wallpaper: "还没有壁纸",
		no_wallpaper_description: "还未上传壁纸，上传壁纸以改变新标签页的背景",
		search_engine: "搜索引擎",
		search_engine_create: {
			trigger: "添加搜索引擎",
			form_title: "添加搜索引擎",
			title: "标题",
			title_placeholder: "网站标题",
			title_description: "网站显示的名称",
			url: "网址",
			url_placeholder: "网站网址",
			url_description: "网站网址",
		},
		search_engine_settings: {
			trigger: "设置",
			form_title: "设置搜索引擎参数",
			form_description: [
				"参考每个搜索引擎提供的字段名称来配置特定的搜索参数。",
				"设置后，这些参数将应用于在该引擎上执行的所有搜索。"
			],
			args_placeholder: "请填写搜索引擎参数",
			comment_placeholder: '备注',
		},
		search_engine_edit: {
			trigger: "编辑",
			form_title: "编辑搜索引擎",
		},
	}
} as const;

export default translations;
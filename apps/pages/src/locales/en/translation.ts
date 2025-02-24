
const translations = {
	common: {
		form_footer: {
			delete: 'Delete',
			cancel: 'Cancel',
			save: 'Save'
		}
	},
	new_tab: {
		search: "Search",
		bookmark: "BookMark",
		history: "History",
		open: "Open",
		edit: "Edit",
		unfixed: "Unfixed",
		copy: "Copy",
		remove: "Remove",
		edit_website: "Edit website",
		site_form: {
			title: "Title",
			title_placeholder: "Website title",
			title_description: "This is website display name.",
			url: "Url",
			url_placeholder: "Website url",
			url_description: "This is website url.",
		}
	},
	options: {
		appearance: "Appearance",
		theme: "Theme",
		color: "Color",
		radius: "Radius",
		wallpaper: "Wallpaper",
		searchEngine: "Search Engine"
	},
	about: "About Us",
	products: "Our Products"
	// 添加更多的翻译...
} as const;

export default translations;

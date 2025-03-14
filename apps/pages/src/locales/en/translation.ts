const translations = {
	common: {
		form_footer: {
			delete: 'Delete',
			cancel: 'Cancel',
			save: 'Save'
		},
		copied: 'Copied',
		copy_failed: 'Copy failed',
		try_again: 'Try again',
		update: 'Update',
		delete: 'Delete',
		cancel: 'Cancel',
		save: 'Save',
		submit: 'Submit',
		confirm: 'Confirm',
		test: 'Test',
	},
	new_tab: {
		search: "Search",
		bookmark: "BookMark",
		history: "History",
		open: "Open",
		edit: "Edit",
		fixed: 'Fixed',
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
	bookmark_popup: {
		site_bookmark_form: {
			title: "Title",
			title_placeholder: "Website title",
			url: "Url",
			url_placeholder: "Website url",
			folder: "Folder",
			folder_placeholder: "Folder",
		}
	},
	options: {
		language: "Language",
		appearance: "Appearance",
		theme: "Theme",
		color: "Color",
		radius: "Radius",
		wallpaper: "Wallpaper",
		upload_wallpaper_form: {
			trigger: "Upload wallpaper",
			form_title: "Upload wallpaper",
			title: "Title",
			title_placeholder: "Wallpaper title",
			file: "File",
			file_placeholder: "Select file",
			file_description: "Please select an image or video file.",
		},
		edit_wallpaper_form: {
			form_title: "Upload wallpaper",
		},
		no_wallpaper: "No wallpaper yet",
		no_wallpaper_description: "No wallpaper yet, You can upload a wallpaper to make your new tab page more beautiful.",
		search_engine: "Search Engine",
		search_engine_create: {
			trigger: "Add search engine",
			form_title: "Add search engine",
			title: "Title",
			title_placeholder: "Website title",
			title_description: "This is website display name.",
			url: "Url",
			url_placeholder: "Website url",
			url_description: "This is website url.",
		},
		search_engine_settings: {
			trigger: "Settings",
			form_title: "Set Search Parameters",
			form_description: [
				'Refer to the field names provided by each search engine to configure specific search parameters.',
				'Once set, these parameters will be applied to all searches performed on that engine.'
			],
			args_placeholder: "Please fill in the search engine parameters",
			comment_placeholder: 'Comment',
		},
		search_engine_edit: {
			trigger: "Edit",
			form_title: "Edit Search Engine",
		},
	}
} as const;

export default translations
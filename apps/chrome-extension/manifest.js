import deepmerge from "deepmerge";

const isFirefox = process.env.__FIREFOX__ === "true";

const sidePanelConfig = {
	// side_panel: {
	//   default_path: 'side-panel/index.html',
	// },
	// permissions: ['sidePanel'],
};

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = deepmerge(
	{
		manifest_version: 3,
		default_locale: "zh_CN",
		name: "__MSG_appName__",
		description: "__MSG_appDesc__",
		offline_enabled: true,
		/**
		 * if you want to support multiple languages, you can use the following reference
		 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
		 */
		version: "1.0.0",
		host_permissions: ["<all_urls>"],
		permissions: [
			// 最常访问
			"topSites",
			// 访问历史 首页搜索
			"history",
			// 获取网站图标
			"favicon",
			// 缓存
			"storage",
			// 执行脚本
			"scripting",
			// 获取tab 信息
			"tabs",
			// 书签目录
			"bookmarks",
			// 粘贴板 读写
			"clipboardRead",
			"clipboardWrite",
			// 右键菜单
			"contextMenus",
			// tab 信息
			'activeTab',
			'tabCapture',
			'tabGroups',
			// 获取网页信息
			'contentSettings',
			// 消息传输
			'nativeMessaging'
		],
		options_page: "pages/options.html",
		background: {
			service_worker: "background.js",
			type: "module",
		},
		action: {
			default_popup: 'pages/popup.html',
			default_icon: 'icon-38.png',
			default_title: "Bookmark",
		},
		chrome_url_overrides: {
			newtab: "pages/new-tab.html",
		},
		icons: {
			16: "icon-16.png",
			19: "icon-19.png",
			38: "icon-38.png",
			48: "icon-48.png",
			128: "icon-128.png",
		},
		web_accessible_resources: [
			{
				resources: ["*.js", "*.css", "*.svg", "*.png", "*.ico"],
				matches: ["*://*/*"],
			},
			{
				"resources": ["_favicon/*", "*"],
				"matches": ["<all_urls>"],
				"extension_ids": ["*"]
			}
		],
	},
	!isFirefox && sidePanelConfig
);

export default manifest;

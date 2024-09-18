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
		default_locale: "en",
		/**
		 * if you want to support multiple languages, you can use the following reference
		 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
		 */
		name: "extension name",
		version: "1.0.0",
		description: "extension name",
		host_permissions: ["<all_urls>"],
		permissions: [
			"downloads",
			"topSites",
			"history",
			"favicon",
			"storage",
			"scripting",
			"tabs",
			"storage",
			"bookmarks"
		],
		options_page: "options/index.html",
		background: {
			service_worker: "background.iife.js",
			type: "module",
		},
		// action: {
		//   default_popup: 'popup/index.html',
		//   default_icon: 'icon-34.png',
		// },
		chrome_url_overrides: {
			newtab: "new-tab/index.html",
		},
		icons: {
			16: "icon-16.png",
			19: "icon-19.png",
			38: "icon-38.png",
			48: "icon-48.png",
			128: "icon-128.png",
		},
		// content_scripts: [
		//   {
		//     matches: ['http://*/*', 'https://*/*', '<all_urls>'],
		//     js: ['content/index.iife.js'],
		//   },
		//   {
		//     matches: ['http://*/*', 'https://*/*', '<all_urls>'],
		//     js: ['content-ui/index.iife.js'],
		//   },
		//   {
		//     matches: ['http://*/*', 'https://*/*', '<all_urls>'],
		//     css: ['content.css'], // public folder
		//   },
		// ],
		// devtools_page: 'devtools/index.html',
		content_security_policy: {
			"extension_pages": "script-src 'self' sha256-wmzHKMX5YACm1VdW8ecEpPuKjHju5z6wS8LONMeHx9g= object-src 'self';"
		},
		web_accessible_resources: [
			{
				resources: ["*.js", "*.css", "*.svg", "*.png", "*.ico"],
				matches: ["*://*/*"],
			},
			{
				"resources": ["_favicon/*"],
				"matches": ["<all_urls>"],
				"extension_ids": ["*"]
			}
		],
	},
	!isFirefox && sidePanelConfig
);

export default manifest;

import type { CreateProperties } from '@repo/shared';
import 'webextension-polyfill';


console.log('background loaded');

const closeCreateBookmark = () => { };

function scriptCreateBookMark() { }

const runtimeKey = {
	bookMarkOpen: 'book_mark_open',
	bookMarkClose: 'book_mark_close',
};

const bookMarkClose = () => { };

const menuIds = {
	save_to_bookmark: 'save_to_bookmark',
};

const menus: CreateProperties[] = [
	{
		id: menuIds.save_to_bookmark,
		title: '保存到书签',
		visible: true,
		contexts: ['all'],
	},
];

// 打开书签保存弹框
const saveToBookmark = (param: chrome.contextMenus.OnClickData, tabs: chrome.tabs.Tab | undefined) => {
	console.log(param, tabs);
	const { frameId } = param;
};

const init = () => {
	chrome.runtime.onMessage.addListener((request, sender, response) => {
		const { method } = request;
		switch (method) {
			case runtimeKey.bookMarkClose:
				bookMarkClose();
				break;
			default:
				break;
		}
	});

	menus.forEach((config) => {
		console.log('config', config);
		chrome.contextMenus.create(config);
	});

	const menusHandler = (param: chrome.contextMenus.OnClickData, tabs: chrome.tabs.Tab | undefined
	) => {
		console.log(param, tabs);
		const { menuItemId } = param;
		switch (menuItemId) {
			case menuIds.save_to_bookmark:
				saveToBookmark(param, tabs);
				break;
			default:
				break;
		}
	};
	chrome.contextMenus.onClicked.addListener(menusHandler);
};
init();

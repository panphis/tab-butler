import type { ContextMenusCreateProperties } from '../type';
import 'webextension-polyfill';
import { MessageTypes } from "@repo/shared";

const bookMarkClose = (sender: chrome.runtime.MessageSender) => {
	chrome.scripting.executeScript({
		target: { tabId: sender?.tab?.id! },
		files: ['./scriptCloseBookmark.js'],
	});
};

const menuIds = {
	save_to_bookmark: 'save_to_bookmark',
};

const menus: ContextMenusCreateProperties[] = [
	{
		id: menuIds.save_to_bookmark,
		title: '保存到书签',
		visible: true,
		contexts: ['all'],
	},
];

// 打开书签保存弹框
const saveToBookmark = (param: chrome.contextMenus.OnClickData, tabs: chrome.tabs.Tab | undefined) => {
	chrome.scripting.executeScript({
		target: { tabId: tabs?.id! },
		files: ['./scriptCreateBookMark.js'],
	});
};

function handlerMessage(request: any, sender: chrome.runtime.MessageSender, response: Function) {
	const { method } = request;
	switch (method) {
		case MessageTypes.bookMarkClose:
			bookMarkClose(sender);
			response();
			break;
		default:
			break;
	}
}



const init = () => {
	chrome.runtime.onMessage.addListener(handlerMessage);

	menus.forEach((config) => {
		chrome.contextMenus.create(config);
	});

	const menusHandler = (param: chrome.contextMenus.OnClickData, tabs: chrome.tabs.Tab | undefined) => {
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

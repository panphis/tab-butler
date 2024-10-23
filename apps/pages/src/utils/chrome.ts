import { TabsCreateProperties, TabQueryInfo, HistoryUrl } from "@repo/shared";

export const openTab = async (params: TabsCreateProperties) => {
	chrome.tabs.create(params);
};




export const queryTabs = async (params: TabQueryInfo) => {
	const res = await chrome.tabs.query(params);
	return res;
};

export const getCurrentTab = async () => {
	const queryOptions = { active: true, currentWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
};


export const queryBookMarker = async (params: chrome.bookmarks.BookmarkSearchQuery) => {
	const res = await chrome.bookmarks.search(params);
	return res;
};



export async function sendMessage(message: any) {
	return await chrome.runtime.sendMessage(message);
}


export async function removeFormHistory(params: HistoryUrl) {
	chrome.history.deleteUrl(params)
}

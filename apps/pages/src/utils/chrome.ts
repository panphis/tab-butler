export const queryTabs = async (parmas: any) => {
	const res = await chrome.tabs.query(parmas);
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

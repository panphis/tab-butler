export function formatBookmark(bookmark: chrome.bookmarks.BookmarkTreeNode[]) {
	return bookmark.reduce((pre, cur) => {
		const { id, title, children, ...others } = cur
		const item: any = {
			id,
			title,
			label: title,
		}
		if (children && children.length > 0) {
			item.children = formatBookmark(children)
		}
		pre.push(item)
		return pre
	}, [] as any[])
}
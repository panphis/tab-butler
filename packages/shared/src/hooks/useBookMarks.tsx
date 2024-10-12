import { useEffect, useState } from "react";


export const useBookMarks = () => {
	const [bookmarkTree, setBookmarks] = useState<chrome.bookmarks.BookmarkTreeNode[]>([])
	useEffect(() => {
		const getBookmarksTrees = async () => {
			const bookmarks = await chrome.bookmarks.getTree()
			setBookmarks(bookmarks)
		}
		getBookmarksTrees()
	}, [])
	return bookmarkTree
}



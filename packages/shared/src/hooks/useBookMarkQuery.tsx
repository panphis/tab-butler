import { useEffect, useState } from "react";


export const useBookMarkQuery = (query: string, maxResults: number = 10) => {
	const [bookmarks, setBookmarks] = useState<chrome.bookmarks.BookmarkTreeNode[]>([])
	useEffect(() => {
		const getBookmarksTrees = async () => {

			if (!query) {
				return setBookmarks([])
			}
			const bookmarks = await chrome.bookmarks.search(query)

			const bookmarksWithUrl = bookmarks.filter(bookmark => bookmark.url).slice(0, maxResults)
			setBookmarks(bookmarksWithUrl)
		}
		getBookmarksTrees()
	}, [query])
	return bookmarks
}



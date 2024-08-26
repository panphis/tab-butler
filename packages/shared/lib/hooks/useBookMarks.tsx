import { useEffect, useState } from "react";


export const useBookMarks = (query: string) => {
	const [bookmarks, setBookmarks] = useState<chrome.bookmarks.BookmarkTreeNode[]>([])
	useEffect(() => {
		const getBookmarksTrees = async () => {

			if (!query) {
				return setBookmarks([])
			}
			const bookmarks = await chrome.bookmarks.search(query)
			setBookmarks(bookmarks)
		}
		getBookmarksTrees()
	}, [query])
	return bookmarks
}



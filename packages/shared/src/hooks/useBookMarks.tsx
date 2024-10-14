import { useEffect, useState, useMemo } from "react";

type BookmarkTreeNode = chrome.bookmarks.BookmarkTreeNode

type BookmarkChangesArg = chrome.bookmarks.BookmarkChangesArg
type BookmarkCreateArg = chrome.bookmarks.BookmarkCreateArg
type BookmarkDestinationArg = chrome.bookmarks.BookmarkDestinationArg

interface UseBookMarksReturn {
	tree: BookmarkTreeNode[],
	loading: boolean,
	updateOrder: (params: { id: string; destination: BookmarkDestinationArg }) => Promise<void>
	deleteBookmark: (id: string) => Promise<void>
	updateBookmark: (id: string, changes: BookmarkChangesArg) => Promise<void>
	createBookmark: (params: BookmarkCreateArg) => Promise<void>
}

export const useBookMarks = (query: string): UseBookMarksReturn => {
	const [bookmarkTree, setBookmarks] = useState<BookmarkTreeNode[]>([])
	const [loading, setLoading] = useState(false)
	const getBookmarksTrees = async () => {
		setLoading(true)
		const bookmarks = await chrome.bookmarks.getTree()
		setBookmarks(bookmarks)
		setLoading(false)
	}

	useEffect(() => {
		getBookmarksTrees()
	}, [])


	const filterTree = (list: BookmarkTreeNode[]): BookmarkTreeNode[] => {
		// 没有搜索字符串直接返回结果
		if (!query) {
			return list
		}
		// 过滤一下
		const result: BookmarkTreeNode[] = list.reduce((pre, cur) => {
			if (cur.children) {
				const children = filterTree(cur.children)
				if (children.length) {
					pre.push({
						...cur,
						children
					})
				}
				return pre
			} else {
				const title = cur.title.toLowerCase()
				const url = cur.url?.toLowerCase()!
				const queryStr = query.toLowerCase()
				if (title.includes(queryStr) || url.includes(queryStr)) {
					pre.push(cur)
				}
				return pre
			}
		}, [] as BookmarkTreeNode[])
		return result
	}


	const filteredTree = useMemo(() => {
		// return bookmarkTree.filter(bookmark => bookmark.url && bookmark.title.toLowerCase().includes(query.toLowerCase()))
		return filterTree(bookmarkTree)
	}, [bookmarkTree, query])

	async function updateOrder(params: { id: any; destination: BookmarkDestinationArg }) {
		const { id, destination } = params;
		const chrome = window?.chrome;
		const { bookmarks } = chrome;
		await bookmarks.move(id, destination);
		getBookmarksTrees()
	}

	async function createBookmark(params: BookmarkCreateArg) {
		const chrome = window?.chrome;
		const { bookmarks } = chrome;
		await bookmarks.create(params);
	}


	async function deleteBookmark(id: string) {
		const chrome = window?.chrome;
		const { bookmarks } = chrome;
		await bookmarks.remove(id);
		getBookmarksTrees()
	}


	async function updateBookmark(id: string, changes: BookmarkChangesArg) {
		const chrome = window?.chrome;
		const { bookmarks } = chrome;
		await bookmarks.update(id, changes);
		getBookmarksTrees()
	}


	return {
		tree: filteredTree,
		loading,
		createBookmark,
		updateOrder,
		deleteBookmark,
		updateBookmark
	}
}



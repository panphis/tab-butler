
import { useState, useEffect } from "react";
import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";
import { Layout } from "@/components";

import type {
	BookmarkTreeNode, Tab
} from "@repo/shared";

import { Skeleton } from "@repo/ui";

import { Context } from "@/components/bookmark-popup";

// style for ui components
import '@repo/ui/dist/globals.css';
import "@repo/ui/dist/style.css";
// style for theme
import '@repo/shared/dist/globals.css';
import "@/styles/globals.css";
import { Space } from "@repo/ui";

import { queryBookMarker, getCurrentTab } from "@/utils";

const BookmarkPopup = () => {

	const [currentTab, setCurrentTab] = useState<BookmarkTreeNode | undefined | Tab>();
	async function init() {
		const tab = await getCurrentTab()
		const bookmark = await queryBookMarker({ url: tab?.url })
		bookmark.length > 0 ? setCurrentTab(bookmark[0]) : setCurrentTab(tab)
	}


	useEffect(() => {
		init()
	}, [])

	return (
		<Layout>
			<Space className="container mx-auto p-4 md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl" direction="col" gap={2}>
				{currentTab ?
					<Context currentTab={currentTab} /> :
					<div className="space-y-2">
						<Skeleton className="h-4" />
						<Skeleton className="h-4" />
						<Skeleton className="h-4" />
					</div>}
			</Space>
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(BookmarkPopup, <div> Loading ... </div>),
	<div> Error Occur </div>
);

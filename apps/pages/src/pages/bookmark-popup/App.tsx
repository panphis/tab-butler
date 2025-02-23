
import { useState, useEffect } from "react";

import { Layout } from "@/components";



import { Skeleton, Space } from "@repo/ui";

import { Context } from "@/components/bookmark-popup";

// style for ui components
import '@repo/ui/dist/globals.css';
import "@repo/ui/dist/style.css";
// style for theme
import "@/styles/globals.css";

import { queryBookMarker, getCurrentTab } from "@/utils";
import { BookmarkTreeNode, Tab } from "@/type";
import { withSuspense } from "@/components/hoc";

import "@/locales/i18n";
import ErrorBoundary from "@/components/error-boundary";

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

const SuspendedBookmarkPopup = withSuspense(BookmarkPopup, <div> Loading ... </div>);

const WithErrorBoundary = () => <ErrorBoundary><SuspendedBookmarkPopup /></ErrorBoundary>
export default WithErrorBoundary



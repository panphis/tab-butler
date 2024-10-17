
import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";

import { Layout } from "@repo/shared";
import { Context } from "@/components/bookmark-popup";

// style for ui components
import '@repo/ui/dist/globals.css';
// style for theme
import '@repo/shared/dist/globals.css';
import "@/styles/globals.css";
import { Space } from "@repo/ui";


const BookmarkPopup = () => {

	return (
		<Layout>
			<Space className="container mx-auto p-4 md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl" direction="col" gap={2}>
				<Context />
			</Space>
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(BookmarkPopup, <div> Loading ... </div>),
	<div> Error Occur </div>
);

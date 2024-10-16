
import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";

import { Layout } from "@repo/shared";
import { Form } from "@/components/bookmark-popup";

// style for ui components
import '@repo/ui/dist/globals.css';
// style for theme
import '@repo/shared/dist/globals.css';
import "@/styles/globals.css";


const BookmarkPopup = () => {

	return (
		<Layout>
			<Form />
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(BookmarkPopup, <div> Loading ... </div>),
	<div> Error Occur </div>
);

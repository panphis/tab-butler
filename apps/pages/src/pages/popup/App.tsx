
import { withErrorBoundary, withSuspense, Layout, formatFileSize } from "@repo/shared";
import { Space } from "@repo/ui";
import { Bookmarks } from "@/components";

// style for ui components
import "@repo/ui/dist/globals.css";
import "@repo/ui/dist/style.css";

// style for theme
import "@repo/shared/dist/globals.css";

import "@/styles/globals.css";

import './styles.css';



function App() {
	return (
		<Layout>
			<Space className="container p-0 mx-auto md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl" direction="col" gap={2}>
				<Bookmarks />
			</Space>
		</Layout>
	);
}



export default withErrorBoundary(
	withSuspense(App, <div> Loading ... </div>),
	<div> Error Occur </div>
);

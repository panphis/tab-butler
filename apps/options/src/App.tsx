// style for ui components
import "@repo/ui/dist/globals.css";
// style for theme
import "@repo/common/dist/globals.css";

import { withErrorBoundary, withSuspense } from "@repo/shared";

import { Layout, ThemeSetting } from "@repo/common";

function App() {
	return (
		<Layout>
			<div className="container mx-auto px-4 mt-8 max-w-lg md:max-w-xl lg:max-w-3xl">
				<ThemeSetting />
			</div>
		</Layout>
	);
}

export default withErrorBoundary(
	withSuspense(App, <div> Loading ... </div>),
	<div> Error Occur </div>
);

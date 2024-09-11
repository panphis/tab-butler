// style for ui components
import "@repo/ui/dist/globals.css";
// style for theme
import "@repo/common/dist/globals.css";

import { withErrorBoundary, withSuspense } from "@repo/shared";

import { Layout, ThemeSetting } from "@repo/common";
import { Space } from "@repo/ui";
import { WallpaperForm, WallpaperList } from "@/components";


function App() {
	return (
		<Layout>
			<Space className="container mx-auto px-4 mt-8 max-w-lg md:max-w-xl lg:max-w-3xl" direction="col" gap={2}>
				<ThemeSetting />
				<WallpaperForm />
				<WallpaperList />
			</Space>
		</Layout>
	);
}

export default withErrorBoundary(
	withSuspense(App, <div> Loading ... </div>),
	<div> Error Occur </div>
);

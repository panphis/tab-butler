// style for ui components
import "@repo/ui/dist/globals.css";
// style for theme
import "@repo/shared/dist/globals.css";

import "./globals.css";
import { withErrorBoundary, withSuspense, Layout, ThemeSetting } from "@repo/shared";
import { Space } from "@repo/ui";
import { WallpaperForm, WallpaperList } from "@/components";


function App() {
	return (
		<Layout>
			<Space className="container mx-auto px-4 md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl" direction="col" gap={2}>
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

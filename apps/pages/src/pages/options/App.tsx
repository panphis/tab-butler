
import { withErrorBoundary, withSuspense, Layout } from "@repo/shared";

import { Space } from "@repo/ui";
import { SettingsContent } from "@/components";

// style for ui components
import "@repo/ui/dist/globals.css";
// style for theme
import "@repo/shared/dist/globals.css";

import "@/styles/globals.css";


function App() {
	return (
		<Layout>
			<Space className="container mx-auto p-4 md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl" direction="col" gap={2}>
				<SettingsContent />
			</Space>
		</Layout>
	);
}

export default withErrorBoundary(
	withSuspense(App, <div> Loading ... </div>),
	<div> Error Occur </div>
);

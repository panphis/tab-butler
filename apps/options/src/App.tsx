import { useState } from "react";

// style for ui components
import "@repo/ui/dist/globals.css";
// style for theme
import "@repo/theme/dist/globals.css";

import { withErrorBoundary, withSuspense } from "@repo/shared";

import { Layout, ThemeSetting } from "@repo/theme";
import { Button } from "@repo/ui";

function App() {
	return (
		<Layout>
			<ThemeSetting />
			<Button>button</Button>
			<div>
				<p>sassaaaaaaa</p>
			</div>
		</Layout>
	);
}

export default withErrorBoundary(
	withSuspense(App, <div> Loading ... </div>),
	<div> Error Occur </div>
);

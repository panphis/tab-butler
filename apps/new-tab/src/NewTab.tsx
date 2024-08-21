import React from "react";

import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";
import { Button } from "@repo/ui";


import { Layout, ThemeSetting } from "@repo/theme";

const NewTab = () => {

	return (
		<Layout>
			<ThemeSetting />
			<Button>button</Button>
			<div>
				<p>sassaaaaaaa</p>
			</div>
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(NewTab, <div> Loading ... </div>),
	<div> Error Occur </div>
);

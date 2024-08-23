import React from "react";

import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";


import { Layout } from "@repo/theme";

import { Wallpaper, Clock, Search } from "@/components";

const NewTab = () => {

	return (
		<Layout>
			<Wallpaper className="flex flex-col justify-center items-center gap-4">
				<Clock />
				<Search />
			</Wallpaper>
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(NewTab, <div> Loading ... </div>),
	<div> Error Occur </div>
);

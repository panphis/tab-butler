import React from "react";

import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";


import { Layout } from "@repo/common";

import { Wallpaper, Clock, SearchForm } from "@/components";

const NewTab = () => {

	return (
		<Layout>
			<Wallpaper className="flex flex-col justify-center items-center gap-4">
				<Clock />
				<SearchForm />
			</Wallpaper>
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(NewTab, <div> Loading ... </div>),
	<div> Error Occur </div>
);

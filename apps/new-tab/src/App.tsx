import React from "react";

import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";


import { Layout } from "@repo/common";

import { Wallpaper, Clock, SearchForm, Sites } from "@/components";


const NewTab = () => {

	return (
		<Layout>
			<Wallpaper className="flex flex-col justify-start items-center py-20 gap-8">
				<Clock />
				<SearchForm />
				<Sites />
			</Wallpaper>
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(NewTab, <div> Loading ... </div>),
	<div> Error Occur </div>
);

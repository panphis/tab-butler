

import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";


import { TooltipProvider } from "@repo/ui";
import { Layout } from "@repo/common";


import { Wallpaper, Clock, SearchForm, Sites, Setting } from "@/components";


const NewTab = () => {

	return (
		<Layout>
			<TooltipProvider>
				<Setting />
				<Wallpaper className="flex flex-col justify-start items-center pt-20 pb-16 gap-8">
					<Clock />
					<SearchForm />
					<Sites />
				</Wallpaper>
			</TooltipProvider>
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(NewTab, <div> Loading ... </div>),
	<div> Error Occur </div>
);

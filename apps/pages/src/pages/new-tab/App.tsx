

import {
	withErrorBoundary,
	withSuspense,
} from "@repo/shared";


import { TooltipProvider } from "@repo/ui";
import { Layout } from "@repo/shared";


import { WallpaperContainer, Clock, SearchForm, Sites, Setting } from "@/components";


// style for ui components
import '@repo/ui/dist/globals.css';
// style for theme
import '@repo/shared/dist/globals.css';
import "@/styles/globals.css";


const NewTab = () => {

	return (
		<Layout>
			<TooltipProvider>
				<WallpaperContainer className="flex flex-col justify-start items-center pt-20 pb-16 gap-8">
					<Clock />
					<SearchForm />
					<Sites />
					<Setting />
				</WallpaperContainer>
			</TooltipProvider>
		</Layout>
	);
};

export default withErrorBoundary(
	withSuspense(NewTab, <div> Loading ... </div>),
	<div> Error Occur </div>
);

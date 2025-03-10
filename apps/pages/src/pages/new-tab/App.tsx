

import {
	withSuspense,
} from "@/components/hoc";


import { TooltipProvider } from "@repo/ui";
import { Layout } from "@/components";


import { WallpaperContainer, Clock, SearchForm, Sites, Setting } from "@/components";
import "@/locales/i18n";


// style for ui components
import '@repo/ui/dist/globals.css';
import "@/styles/globals.css";
import ErrorBoundary from "@/components/error-boundary";


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

const SuspendedBookmarkNewTab = withSuspense(NewTab, <div> Loading ... </div>);
const WithErrorBoundary = () => <ErrorBoundary><SuspendedBookmarkNewTab /></ErrorBoundary>
export default WithErrorBoundary
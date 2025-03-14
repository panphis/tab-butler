

import {
	withSuspense,
} from "@/components/hoc";
import { Layout } from "@/components";
import { Space } from "@repo/ui";
import { SettingsContent } from "@/components";
import "@/locales/i18n";

// style for ui components
import "@repo/ui/dist/globals.css";

import "@/styles/globals.css";
import ErrorBoundary from "@/components/error-boundary";


function Options() {
	return (
		<Layout>
			<Space className="container mx-auto p-4 md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl" direction="col" gap={2}>
				<SettingsContent />
			</Space>
		</Layout>
	);
}


const SuspendedBookmarkOptions = withSuspense(Options, <div> Loading ... </div>);
const WithErrorBoundary = () => <ErrorBoundary><SuspendedBookmarkOptions /></ErrorBoundary>
export default WithErrorBoundary 
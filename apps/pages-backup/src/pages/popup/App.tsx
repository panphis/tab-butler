

import {
	withSuspense,
} from "@/components/hoc";
import { Space } from "@repo/ui";
import { Layout } from "@/components";
import { Bookmarks } from "@/components";
import "@/locales/i18n";

// style for ui components
import "@repo/ui/dist/globals.css";
import "@repo/ui/dist/style.css";


import "@/styles/globals.css";

import './styles.css';
import ErrorBoundary from "@/components/error-boundary";



function Popup() {
	return (
		<Layout>
			<Space className="container p-0 mx-auto md:max-w-xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl" direction="col" gap={2}>
				<Bookmarks />
			</Space>
		</Layout>
	);
}







const SuspendedBookmarkPopup = withSuspense(Popup, <div> Loading ... </div>);

const WithErrorBoundary = () => <ErrorBoundary><SuspendedBookmarkPopup /></ErrorBoundary>
export default WithErrorBoundary 

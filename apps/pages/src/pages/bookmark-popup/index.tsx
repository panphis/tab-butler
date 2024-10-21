import { createRoot } from 'react-dom/client';
import App from './App';

function init() {
	const rootElementId = 'root';
	const appContainer = document.getElementById(rootElementId);
	if (!appContainer) {
		throw new Error(`Can not find #${rootElementId}`);
	}
	const root = createRoot(appContainer);

	root.render(<App />);
}

init();
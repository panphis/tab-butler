import { createRoot } from 'react-dom/client';
// style for ui components
import '@repo/ui/dist/globals.css';
// style for theme
import '@repo/common/dist/globals.css';
import "./globals.css";
import NewTab from '@/App';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<NewTab />);
}

init();

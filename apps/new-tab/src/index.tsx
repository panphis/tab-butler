import { createRoot } from 'react-dom/client';
// style for ui components
import '@repo/ui/dist/globals.css';
// style for theme
import '@repo/theme/dist/globals.css';
import NewTab from '@/NewTab';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<NewTab />);
}

init();

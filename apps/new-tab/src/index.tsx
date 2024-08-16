import { createRoot } from 'react-dom/client';
import '@repo/ui/dist/globals.css';
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

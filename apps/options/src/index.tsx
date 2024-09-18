import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'




function init() {
  const rootElementId = 'root';
  const appContainer = document.getElementById(rootElementId)!;
  if (!appContainer) {
    throw new Error('Can not find #root');
  }
  const root = createRoot(appContainer);

  root.render(<StrictMode>
    <App />
  </StrictMode>);
}

init();
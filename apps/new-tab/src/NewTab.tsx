
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@repo/shared';
import { exampleThemeStorage } from '@repo/storage';
import { Button } from '@repo/ui';

const NewTab = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'new-tab/logo_horizontal.svg' : 'new-tab/logo_horizontal_dark.svg';

  return (
    <div
      className={`bg-background text-foreground ${isLight ? 'light' : 'dark'}`}
      style={{
        "colorScheme": isLight ? 'light' : 'dark'
      }}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        <p>
          Edit <code>pages/new-tab/src/NewTab.tsx</code>
        </p>
        <h6>The color of this paragraph is defined using SASS.</h6>
        <Button onClick={exampleThemeStorage.toggle}>
          Toggle theme
        </Button>
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div> Loading ... </div>), <div> Error Occur </div>);

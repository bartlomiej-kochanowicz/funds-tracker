import { Button } from 'components/atoms';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const Dashboard = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log(`SW Registered: ${r}`);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div>
      {(offlineReady || needRefresh) && (
        <div>
          <div>
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>New content available, click on reload button to update.</span>
            )}
          </div>

          {needRefresh && <Button onClick={() => updateServiceWorker(true)}>Reload</Button>}

          <Button onClick={() => close()}>Close</Button>
        </div>
      )}
    </div>
  );
};

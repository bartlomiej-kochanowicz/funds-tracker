import { useRegisterSW } from 'virtual:pwa-register/react';

import styles from './ReloadPrompt.module.scss';

export const ReloadPrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log('SW Registered: ' + r);
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
    <div className={styles['ReloadPrompt-container']}>
      {(offlineReady || needRefresh) && (
        <div className={styles['ReloadPrompt-toast']}>
          <div className={styles['ReloadPrompt-message']}>
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>New content available, click on reload button to update.</span>
            )}
          </div>
          {needRefresh && (
            <button
              type="button"
              className={styles['ReloadPrompt-toast-button']}
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button
            type="button"
            className={styles['ReloadPrompt-toast-button']}
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

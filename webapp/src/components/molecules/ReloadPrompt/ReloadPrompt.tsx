import { useRegisterSW } from 'virtual:pwa-register/react';

import {
  ReloadPromptToast,
  ReloadPromptToastButton,
  ReloadPromptToastMessage,
} from './ReloadPrompt.styles';

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

  return offlineReady || needRefresh ? (
    <ReloadPromptToast>
      <ReloadPromptToastMessage>
        {offlineReady ? (
          <span>App ready to work offline</span>
        ) : (
          <span>New content available, click on reload button to update.</span>
        )}
      </ReloadPromptToastMessage>
      {needRefresh && (
        <ReloadPromptToastButton onClick={() => updateServiceWorker(true)}>
          Reload
        </ReloadPromptToastButton>
      )}
      <ReloadPromptToastButton onClick={() => close()}>Close</ReloadPromptToastButton>
    </ReloadPromptToast>
  ) : null;
};

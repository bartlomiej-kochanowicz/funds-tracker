import { FC, Suspense } from 'react';
import { WelcomeProvider } from './context';

const WelcomeContent: FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <div>Welcome</div>
  </Suspense>
);

export const Welcome: FC = () => (
  <WelcomeProvider>
    <WelcomeContent />
  </WelcomeProvider>
);

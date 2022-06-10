import { FC, Suspense } from 'react';
import { Input } from 'components/atoms/Input';
import { WelcomeProvider } from './context';

const WelcomeContent: FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <div>Welcome</div>

    <Input
      label="test"
      id="id"
      name="name"
      defaultValue="test"
    />
  </Suspense>
);

export const Welcome: FC = () => (
  <WelcomeProvider>
    <WelcomeContent />
  </WelcomeProvider>
);

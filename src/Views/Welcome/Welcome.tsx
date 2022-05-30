import { FC, Suspense } from 'react';
import { Hello } from 'views/Welcome/components/Steps/Hello';

export const Welcome: FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <div>
      <Hello />
    </div>
  </Suspense>
);

import { FC, Suspense } from 'react';
import { Splash } from 'views/Welcome/components/Steps/Splash';
import { Onboarding } from 'views/Welcome/components/Onboarding';
/* import { Onboarding01 } from 'views/Welcome/components/Steps/Onboarding01'; */
import { Onboarding02 } from 'views/Welcome/components/Steps/Onboarding02';
import { Onboarding03 } from 'views/Welcome/components/Steps/Onboarding03';
import { Welcome as WelcomeStep } from 'views/Welcome/components/Steps/Welcome';
import { WelcomeProvider, useWelcomeContext } from './context';

const WelcomeContent: FC = () => {
  const { states, compareState } = useWelcomeContext();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {compareState(states.splash) && <Splash />}

        {compareState(states.onboarding01) && (
          <Onboarding
            title="test"
            subtitle="test 2"
          />
        )}

        {compareState(states.onboarding02) && <Onboarding02 />}

        {compareState(states.onboarding03) && <Onboarding03 />}

        {compareState(states.welcome) && <WelcomeStep />}
      </div>
    </Suspense>
  );
};

export const Welcome: FC = () => (
  <WelcomeProvider>
    <WelcomeContent />
  </WelcomeProvider>
);

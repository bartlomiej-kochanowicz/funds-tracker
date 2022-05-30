import { FC, Suspense } from 'react';
import { Onboarding00 } from 'views/Welcome/components/Steps/Onboarding00';
/* import { Onboarding01 } from 'views/Welcome/components/Steps/Onboarding01';
import { Onboarding02 } from 'views/Welcome/components/Steps/Onboarding02';
import { Onboarding03 } from 'views/Welcome/components/Steps/Onboarding03'; */

export const Welcome: FC = () => {
  const step = 'onboarding00';

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {step === 'onboarding00' && <Onboarding00 />}

        {/* {step === 'onboarding01' && <Onboarding01 />}

        {step === 'onboarding01' && <Onboarding02 />}

        {step === 'onboarding01' && <Onboarding03 />} */}
      </div>
    </Suspense>
  );
};

import { lazy, Suspense } from 'react';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { IntroductionProvider, useIntroductionContext } from './context';

const AddInstrumentForm = lazy(() =>
  import('./components/AddInstrumentForm').then(({ AddInstrumentForm: component }) => ({
    default: component,
  })),
);

const FormSuccess = lazy(() =>
  import('./components/FormSuccess').then(({ FormSuccess: component }) => ({
    default: component,
  })),
);

const IntroductionContent = () => {
  const { states, compareState } = useIntroductionContext();

  return (
    <FullscreenClear>
      <Suspense>
        {compareState(states.addInstrument) && <AddInstrumentForm />}

        {compareState(states.formSuccess) && <FormSuccess />}
      </Suspense>
    </FullscreenClear>
  );
};

export const Introduction = () => (
  <IntroductionProvider>
    <IntroductionContent />
  </IntroductionProvider>
);

Introduction.displayName = 'Introduction';

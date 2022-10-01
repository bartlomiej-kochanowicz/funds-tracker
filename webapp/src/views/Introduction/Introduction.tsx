import { lazy, Suspense } from 'react';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { AnimatePresence } from 'framer-motion';
import { IntroductionProvider, useIntroductionContext } from './context';

const Welcome = lazy(() =>
  import('./components/Welcome').then(({ Welcome: component }) => ({
    default: component,
  })),
);

const AddCashAccountsForm = lazy(() =>
  import('./components/AddCashAccountsForm').then(({ AddCashAccountsForm: component }) => ({
    default: component,
  })),
);

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
        <AnimatePresence>
          {compareState(states.welcome) && <Welcome />}

          {compareState(states.addCashAccounts) && <AddCashAccountsForm />}

          {compareState(states.addInstrument) && <AddInstrumentForm />}

          {compareState(states.formSuccess) && <FormSuccess />}
        </AnimatePresence>
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

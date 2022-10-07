import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { IntroductionProvider, useIntroductionContext } from './context';
import { Loading } from 'layouts/Loading';

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
      <Suspense fallback={<Loading />}>
        <AnimatePresence>
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

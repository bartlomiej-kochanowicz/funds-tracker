import { lazy, Suspense } from 'react';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { IntroductionProvider, useIntroductionContext } from './context';
import { Welcome } from './components/Welcome';
import { AddCashAccountsForm } from './components/AddCashAccountsForm';

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
        {compareState(states.welcome) && <Welcome />}

        {compareState(states.addCashAccounts) && <AddCashAccountsForm />}

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

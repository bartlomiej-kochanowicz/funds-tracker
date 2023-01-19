import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { Loading } from 'layouts/Loading';
import { IntroductionProvider, useIntroductionContext } from './context';

const DefaultCurrency = lazy(() =>
  import('./components/DefaultCurrency').then(({ DefaultCurrency: component }) => ({
    default: component,
  })),
);

const AddCashAccountsForm = lazy(() =>
  import('./components/AddCashAccountsForm').then(({ AddCashAccountsForm: component }) => ({
    default: component,
  })),
);

const AddPortfoliosForm = lazy(() =>
  import('./components/AddPortfoliosForm').then(({ AddPortfoliosForm: component }) => ({
    default: component,
  })),
);

const Completed = lazy(() =>
  import('./components/Completed').then(({ Completed: component }) => ({
    default: component,
  })),
);

const IntroductionContent = () => {
  const { states, compareState } = useIntroductionContext();

  return (
    <FullscreenClear>
      <Suspense fallback={<Loading />}>
        <AnimatePresence>
          {compareState(states.DefaultCurrency) && <DefaultCurrency />}

          {compareState(states.CashAccounts) && <AddCashAccountsForm />}

          {compareState(states.Portfolios) && <AddPortfoliosForm />}

          {compareState(states.Completed) && <Completed />}
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

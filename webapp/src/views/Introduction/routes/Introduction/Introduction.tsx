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

const CreateCashAccountsForm = lazy(() =>
  import('./components/CreateCashAccountsForm').then(({ CreateCashAccountsForm: component }) => ({
    default: component,
  })),
);

const CreatePortfoliosForm = lazy(() =>
  import('./components/CreatePortfoliosForm').then(({ CreatePortfoliosForm: component }) => ({
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

          {compareState(states.CashAccounts) && <CreateCashAccountsForm />}

          {compareState(states.Portfolios) && <CreatePortfoliosForm />}

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

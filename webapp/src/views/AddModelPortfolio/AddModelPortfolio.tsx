import { lazy, Suspense } from 'react';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { AddModelPortfolioProvider, useAddModelPortfolioContext } from './context';

const AddInstrumentForm = lazy(() =>
  import('./components/AddInstrumentForm').then(({ AddInstrumentForm: component }) => ({
    default: component,
  })),
);

const AddFirstInstrumentSuccess = lazy(() =>
  import('./components/AddFirstInstrumentSuccess').then(
    ({ AddFirstInstrumentSuccess: component }) => ({
      default: component,
    }),
  ),
);

const AddModelPortfolioContent = () => {
  const { states, compareState } = useAddModelPortfolioContext();

  return (
    <FullscreenClear
      alignItems="center"
      justifyContent="center"
    >
      <Suspense>
        {compareState(states.addFirstInstrument) && <AddInstrumentForm />}

        {compareState(states.addFirstSuccess) && <AddFirstInstrumentSuccess />}
      </Suspense>
    </FullscreenClear>
  );
};

export const AddModelPortfolio = () => (
  <AddModelPortfolioProvider>
    <AddModelPortfolioContent />
  </AddModelPortfolioProvider>
);

AddModelPortfolio.displayName = 'AddModelPortfolio';

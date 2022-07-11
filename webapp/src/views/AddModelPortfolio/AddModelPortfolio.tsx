import { FullscreenClear } from 'layouts/FullscreenClear';
import { AddInstrumentForm } from './components/AddInstrumentForm';
import { AddModelPortfolioProvider, useAddModelPortfolioContext } from './context';

const AddModelPortfolioContent = () => {
  const { states, compareState } = useAddModelPortfolioContext();

  return (
    <FullscreenClear
      alignItems="center"
      justifyContent="center"
    >
      {compareState(states.addFirstInstrument) && <AddInstrumentForm />}

      {compareState(states.addFirstSuccess) && <AddInstrumentForm />}
    </FullscreenClear>
  );
};

export const AddModelPortfolio = () => (
  <AddModelPortfolioProvider>
    <AddModelPortfolioContent />
  </AddModelPortfolioProvider>
);

AddModelPortfolio.displayName = 'AddModelPortfolio';

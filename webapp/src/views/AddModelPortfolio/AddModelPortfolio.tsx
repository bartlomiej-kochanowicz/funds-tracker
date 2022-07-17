import { FullscreenClear } from 'layouts/FullscreenClear';
import { AddInstrumentForm } from './components/AddInstrumentForm';
import { AddFirstInstrumentSuccess } from './components/AddFirstInstrumentSuccess';
import { AddModelPortfolioProvider, useAddModelPortfolioContext } from './context';

const AddModelPortfolioContent = () => {
  const { states, compareState } = useAddModelPortfolioContext();

  return (
    <FullscreenClear
      alignItems="center"
      justifyContent="center"
    >
      {compareState(states.addFirstInstrument) && <AddInstrumentForm />}

      {compareState(states.addFirstSuccess) && <AddFirstInstrumentSuccess />}
    </FullscreenClear>
  );
};

export const AddModelPortfolio = () => (
  <AddModelPortfolioProvider>
    <AddModelPortfolioContent />
  </AddModelPortfolioProvider>
);

AddModelPortfolio.displayName = 'AddModelPortfolio';

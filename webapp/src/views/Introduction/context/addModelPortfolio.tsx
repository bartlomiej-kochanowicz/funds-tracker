import { createContext, FC, useContext } from 'react';
import { useStateMachine, StateMachine } from 'hooks/useStateMachine';

const AddModelPortfolioContext = createContext<AddModelPortfolioContextType | null>(null);

type AddModelPortfolioContextType = ReturnType<typeof useIntroduction>;

type IntroductionStates = 'addCashAccounts' | 'addInstrument' | 'formSuccess';

type IntroductionActions =
  | 'CHANGE_TO_ADD_CASH_ACCOUNTS'
  | 'CHANGE_TO_ADD_INSTRUMENT'
  | 'CHANGE_TO_FORM_SUCCESS';

const IntroductionStateMachine = new StateMachine<IntroductionStates, IntroductionActions>(
  'addCashAccounts',
  {
    addCashAccounts: 'addCashAccounts',
    addInstrument: 'addInstrument',
    formSuccess: 'formSuccess',
  },
  {
    CHANGE_TO_ADD_CASH_ACCOUNTS: 'CHANGE_TO_ADD_CASH_ACCOUNTS',
    CHANGE_TO_ADD_INSTRUMENT: 'CHANGE_TO_ADD_INSTRUMENT',
    CHANGE_TO_FORM_SUCCESS: 'CHANGE_TO_FORM_SUCCESS',
  },
  {
    addCashAccounts: { CHANGE_TO_ADD_INSTRUMENT: 'addInstrument' },
    addInstrument: {
      CHANGE_TO_FORM_SUCCESS: 'formSuccess',
      CHANGE_TO_ADD_CASH_ACCOUNTS: 'addCashAccounts',
    },
  },
);

const useIntroduction = () => {
  const { states, actions, updateState, compareState } = useStateMachine<
    IntroductionStates,
    IntroductionActions
  >(IntroductionStateMachine);

  return {
    states,
    actions,
    updateState,
    compareState,
  };
};

type ProviderProps = {
  children: React.ReactNode;
};

export const IntroductionProvider: FC<ProviderProps> = ({ children }) => {
  const value = useIntroduction();

  return (
    <AddModelPortfolioContext.Provider value={value}>{children}</AddModelPortfolioContext.Provider>
  );
};

export const useIntroductionContext = () => {
  const value = useContext(AddModelPortfolioContext);

  if (!value) {
    throw new Error('useAddModelPortfolioContext must be used inside AddModelPortfolioProvider');
  }

  return value;
};

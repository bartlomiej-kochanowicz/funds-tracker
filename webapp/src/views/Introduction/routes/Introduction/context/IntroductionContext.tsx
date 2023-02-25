import { IntroductionStep } from '__generated__/graphql';
import { useUserContext } from 'contexts/UserContext';
import { StateMachine, useStateMachine } from 'hooks/useStateMachine';
import { createContext, FC, useContext } from 'react';

const AddModelPortfolioContext = createContext<AddModelPortfolioContextType | null>(null);

type AddModelPortfolioContextType = ReturnType<typeof useIntroduction>;

type IntroductionActions =
  | 'CHANGE_TO_ADD_CASH_ACCOUNTS'
  | 'CHANGE_TO_ADD_PORTFOLIOS'
  | 'CHANGE_TO_COMPLETED';

const useIntroduction = () => {
  const { user } = useUserContext();

  const IntroductionStateMachine = new StateMachine<IntroductionStep, IntroductionActions>(
    user.introductionStep,
    {
      [IntroductionStep.DefaultCurrency]: IntroductionStep.DefaultCurrency,
      [IntroductionStep.CashAccounts]: IntroductionStep.CashAccounts,
      [IntroductionStep.Portfolios]: IntroductionStep.Portfolios,
      [IntroductionStep.Completed]: IntroductionStep.Completed,
    },
    {
      CHANGE_TO_ADD_CASH_ACCOUNTS: 'CHANGE_TO_ADD_CASH_ACCOUNTS',
      CHANGE_TO_ADD_PORTFOLIOS: 'CHANGE_TO_ADD_PORTFOLIOS',
      CHANGE_TO_COMPLETED: 'CHANGE_TO_COMPLETED',
    },
    {
      [IntroductionStep.DefaultCurrency]: {
        CHANGE_TO_ADD_CASH_ACCOUNTS: IntroductionStep.CashAccounts,
      },
      [IntroductionStep.CashAccounts]: { CHANGE_TO_ADD_PORTFOLIOS: IntroductionStep.Portfolios },
      [IntroductionStep.Portfolios]: {
        CHANGE_TO_COMPLETED: IntroductionStep.Completed,
      },
    },
  );

  const { states, actions, updateState, compareState } = useStateMachine<
    IntroductionStep,
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

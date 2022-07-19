import { createContext, FC, useState, useContext } from 'react';

const AddModelPortfolioContext = createContext<AddModelPortfolioContextType | null>(null);

type AddModelPortfolioContextType = ReturnType<typeof useProviderAddModelPortfolio>;

const states = {
  addFirstInstrument: 'addFirstInstrument',
  addFirstSuccess: 'addFirstSuccess',
};

const actions = {
  CHANGE_ADD_FIRST_SUCCESS: 'CHANGE_ADD_FIRST_SUCCESS',
};

type ValueOf<T> = T[keyof T];

type StateType = ValueOf<typeof states>;
type ActionType = ValueOf<typeof actions>;

const useProviderAddModelPortfolio = () => {
  const [currentState, setCurrentState] = useState<StateType>(states.addFirstSuccess as StateType);

  const transitions = {
    [states.addFirstInstrument]: {
      [actions.CHANGE_ADD_FIRST_SUCCESS]: states.addFirstSuccess,
    },
  };

  const transition = (state: StateType, action: ActionType): StateType => {
    const nextState = transitions[state][action] as StateType;

    return nextState || state;
  };

  const updateState = (action: ActionType) => setCurrentState(state => transition(state, action));

  const compareState = (state: StateType) => currentState === state;

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

export const AddModelPortfolioProvider: FC<ProviderProps> = ({ children }) => {
  const value = useProviderAddModelPortfolio();

  return (
    <AddModelPortfolioContext.Provider value={value}>{children}</AddModelPortfolioContext.Provider>
  );
};

export const useAddModelPortfolioContext = () => {
  const value = useContext(AddModelPortfolioContext);

  if (!value) {
    throw new Error('useAddModelPortfolioContext must be used inside AddModelPortfolioProvider');
  }

  return value;
};

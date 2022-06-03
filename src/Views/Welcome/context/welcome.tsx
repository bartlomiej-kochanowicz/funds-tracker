import { createContext, FC, useState, useContext } from 'react';

const WelcomeContext = createContext<WelcomeContextType | null>(null);

type WelcomeContextType = ReturnType<typeof useProviderWelcome>;

const states = {
  splash: 'splash',
  onboarding01: 'onboarding01',
  onboarding02: 'onboarding02',
  onboarding03: 'onboarding03',
  welcome: 'welcome',
};

const actions = {
  SKIP: 'SKIP',
  CHANGE_ONBOARDING01: 'CHANGE_ONBOARDING01',
  CHANGE_ONBOARDING02: 'CHANGE_ONBOARDING02',
  CHANGE_ONBOARDING03: 'CHANGE_ONBOARDING03',
  CHANGE_WELCOME: 'CHANGE_WELCOME',
};

type ValueOf<T> = T[keyof T];

type StateType = ValueOf<typeof states>;
type ActionType = ValueOf<typeof actions>;

const useProviderWelcome = () => {
  const [currentState, setCurrentState] = useState<StateType>(states.splash as StateType);

  const transitions = {
    [states.splash]: {
      [actions.CHANGE_ONBOARDING01]: states.onboarding01,
    },
    [states.onboarding01]: {
      [actions.CHANGE_ONBOARDING02]: states.onboarding02,
      [actions.CHANGE_WELCOME]: states.welcome,
    },
    [states.onboarding02]: {
      [actions.CHANGE_ONBOARDING03]: states.onboarding03,
      [actions.CHANGE_WELCOME]: states.welcome,
    },
    [states.onboarding03]: {
      [actions.CHANGE_WELCOME]: states.welcome,
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

export const WelcomeProvider: FC<ProviderProps> = ({ children }) => {
  const value = useProviderWelcome();

  return <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>;
};

export const useWelcomeContext = () => {
  const value = useContext(WelcomeContext);

  if (!value) {
    throw new Error('useWelcomeContext must be used inside WelcomeProvider');
  }

  return value;
};

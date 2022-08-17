import { Dict } from 'types/mapped-types';

type Transitions<States extends string, Actions extends string> = {
  [state in States]: {
    [action in Actions]: States;
  };
};

export class StateMachine<States extends string, Actions extends string> {
  constructor(
    private initial: States,
    private states: Dict<States>,
    private actions: Dict<Actions>,
    private transitions: Transitions<States, Actions>,
  ) {}
}

export const useStateMachine = () => {
  /* const [currentState, setCurrentState] = useState<StateType>(
    states.addFirstInstrument as StateType,
  );

  const transitions = {
    [states.addFirstInstrument]: {
      [actions.CHANGE_ADD_FIRST_SUCCESS]: states.addFirstSuccess,
    },
  };

  const transition = (state: StateType, action: ActionType): StateType => {
    const nextState = transitions[state][action] as StateType;

    return nextState || state;
  }; */
};

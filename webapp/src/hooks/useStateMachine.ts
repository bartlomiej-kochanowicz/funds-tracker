import { useState } from 'react';
import { Dict } from 'types/mapped-types';

type Transitions<States extends string, Actions extends string> = {
  [state in States]?: {
    [action in Actions]?: States;
  };
};

export class StateMachine<States extends string, Actions extends string> {
  constructor(
    private readonly initial: States,
    private readonly states: Dict<States>,
    private readonly actions: Dict<Actions>,
    private readonly transitions: Transitions<States, Actions>,
  ) {}

  get getInitialState() {
    return this.initial;
  }

  get getStates() {
    return this.states;
  }

  get getActions() {
    return this.actions;
  }

  get getTransitions() {
    return this.transitions;
  }
}

export const useStateMachine = <States extends string, Actions extends string>(
  stateMachine: StateMachine<States, Actions>,
) => {
  const [currentState, setCurrentState] = useState<States>(stateMachine.getInitialState);

  const transition = (state: States, action: Actions): States => {
    const nextState = stateMachine.getTransitions?.[state]?.[action] as States;

    return nextState || state;
  };

  const updateState = (action: Actions) => setCurrentState(state => transition(state, action));

  const compareState = (state: States) => currentState === state;

  return {
    states: stateMachine.getStates,
    actions: stateMachine.getActions,
    updateState,
    compareState,
  };
};

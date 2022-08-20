import { useState } from 'react';

type Dict<T extends string> = { [k in T]: T };

type Transitions<States extends string, Actions extends string> = {
  [state in States]?: {
    [action in Actions]?: States;
  };
};

/** Class representing a StateMachine. */
export class StateMachine<States extends string, Actions extends string> {
  /**
   * Create machine.
   * @param {string} initial - initial state.
   * @param {object} states - object of machine states
   * @param {object} actions - object of machine actions
   * @param {object} transitions - object of machine transitions
   */
  constructor(
    private readonly initial: States,
    private readonly states: Dict<States>,
    private readonly actions: Dict<Actions>,
    private readonly transitions: Transitions<States, Actions>,
  ) {}

  /**
   * Get the initial state.
   * @return {string} The initail state.
   */
  get getInitialState() {
    return this.initial;
  }

  /**
   * Get the states.
   * @return {object} The machine states.
   */
  get getStates() {
    return this.states;
  }

  /**
   * Get the actions.
   * @return {object} The machine actions.
   */
  get getActions() {
    return this.actions;
  }

  /**
   * Get the transitions.
   * @return {object} The machine transitions.
   */
  get getTransitions() {
    return this.transitions;
  }
}

export const useStateMachine = <States extends string, Actions extends string>(
  stateMachine: StateMachine<States, Actions>,
) => {
  // Machine state with only State type
  const [currentState, setCurrentState] = useState<States>(stateMachine.getInitialState);

  // Check if machine can do provided action depends on predefined transitions
  const transition = (state: States, action: Actions): States => {
    const nextState = stateMachine.getTransitions?.[state]?.[action] as States;

    return nextState || state;
  };

  // Update machine state besed on transition function above
  const updateState = (action: Actions) => setCurrentState(state => transition(state, action));

  // Compare provided state to current one
  const compareState = (state: States) => currentState === state;

  return {
    states: stateMachine.getStates,
    actions: stateMachine.getActions,
    updateState,
    compareState,
  };
};

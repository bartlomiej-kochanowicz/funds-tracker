import type { Dict } from 'types/mapped-types.type';

export type Transitions<States extends string, Actions extends string> = {
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

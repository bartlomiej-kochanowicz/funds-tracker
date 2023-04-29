import { useState } from 'react';

import { StateMachine } from './StateMachine';

type ContextArg<Context> = Context | ((context: Context | undefined) => Context);

export const useStateMachine = <States extends string, Actions extends string, Context = unknown>(
  stateMachine: StateMachine<States, Actions>,
) => {
  // Machine state with only State type
  const [currentState, setCurrentState] = useState<States>(stateMachine.getInitialState);
  const [currentContext, setCurrentContext] = useState<Context>();

  // Check if machine can do provided action depends on predefined transitions
  const transition = (state: States, action: Actions, context?: ContextArg<Context>): States => {
    const nextState = stateMachine.getTransitions?.[state]?.[action] as States;

    if (context instanceof Function) {
      setCurrentContext(context(currentContext));
    } else {
      setCurrentContext(context);
    }

    return nextState || state;
  };

  // Update machine state besed on transition function above
  const updateState = (action: Actions, context?: ContextArg<Context>) =>
    setCurrentState(state => transition(state, action, context));

  // Compare provided state to current one
  const compareState = (state: States) => currentState === state;

  return {
    states: stateMachine.getStates,
    actions: stateMachine.getActions,
    updateState,
    compareState,
    context: currentContext,
  };
};

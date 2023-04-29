import { StateMachine } from './StateMachine';
import { actions, states, transitions } from './tests/stubs/StateMachine.stub';

describe('StateMachine', () => {
  const machine = new StateMachine<keyof typeof states, keyof typeof actions>(
    'initial',
    states,
    actions,
    transitions,
  );

  it('should create a new StateMachine', () => {
    expect(machine).toBeInstanceOf(StateMachine);
  });

  it('should return the initial state', () => {
    expect(machine.getInitialState).toBe('initial');
  });

  it('should return the states', () => {
    expect(machine.getStates).toEqual(states);
  });

  it('should return the actions', () => {
    expect(machine.getActions).toEqual(actions);
  });

  it('should return the transitions', () => {
    expect(machine.getTransitions).toEqual(transitions);
  });
});

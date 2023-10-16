export const states = {
  initial: 'initial',
  state1: 'state1',
  state2: 'state2',
  final: 'final',
} as const;

export const actions = {
  CHANGE_TO_STATE1: 'CHANGE_TO_STATE1',
  CHANGE_TO_STATE2: 'CHANGE_TO_STATE2',
  CHANGE_TO_FINAL: 'CHANGE_TO_FINAL',
} as const;

export const transitions = {
  initial: {
    CHANGE_TO_STATE1: 'state1',
  },
  state1: {
    CHANGE_TO_STATE2: 'state2',
  },
  state2: {
    CHANGE_TO_FINAL: 'final',
  },
} as const;

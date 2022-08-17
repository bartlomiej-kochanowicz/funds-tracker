import { useState } from 'react';
import { ValueOf } from 'types/mapped-types';

const states = {
  email: 'email',
  password: 'password',
};

const actions = {
  CHANGE_TO_PASSWORD_STEP: 'CHANGE_TO_PASSWORD_STEP',
};

type StateType = ValueOf<typeof states>;
type ActionType = ValueOf<typeof actions>;

export const useFormState = () => {
  const [formState, setFormState] = useState<StateType>(states.email as StateType);
};

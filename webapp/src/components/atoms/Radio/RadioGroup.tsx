import { FC, ReactElement, useRef } from 'react';

import { RadioGroupProvider } from './context';

interface IRadioGroupProps {
  children: ReactElement[];
  label: string;
  id: string;
}

export const RadioGroup: FC<IRadioGroupProps> = ({ children, label, id }) => {
  const values = children.map(child => child.props.value) as string[];

  return (
    <RadioGroupProvider values={values}>
      <div
        role="radiogroup"
        aria-labelledby={`group_${label}_${id}`}
        id={id}
      >
        <h3 id={id}>{label}</h3>

        {children}
      </div>
    </RadioGroupProvider>
  );
};

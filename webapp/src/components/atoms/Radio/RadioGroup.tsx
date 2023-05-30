import { FC, ReactElement } from 'react';

import { RadioGroupProvider } from './context';

interface IRadioGroupProps {
  children: ReactElement[];
  label?: string;
  id: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export const RadioGroup: FC<IRadioGroupProps> = ({
  children,
  label,
  id,
  onChange,
  defaultValue,
}) => {
  const values = children.map(child => child.props.value) as string[];

  return (
    <RadioGroupProvider
      values={values}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      <div
        role="radiogroup"
        aria-labelledby={`group_${id}`}
        id={id}
      >
        {label && <h3 id={id}>{label}</h3>}

        {children}
      </div>
    </RadioGroupProvider>
  );
};

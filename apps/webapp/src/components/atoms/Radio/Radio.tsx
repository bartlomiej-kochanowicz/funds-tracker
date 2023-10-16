import { FC, ReactNode } from 'react';

import { useRadioGroupContext } from './context';
import { StyledRadio } from './Radio.styles';

interface IRadioProps {
  children: ReactNode;
  value: string;
}

export const Radio: FC<IRadioProps> = ({ children, value }) => {
  const { register } = useRadioGroupContext();

  return (
    <StyledRadio
      role="radio"
      aria-checked="false"
      tabIndex={-1}
      {...register(value)}
    >
      {children}
    </StyledRadio>
  );
};

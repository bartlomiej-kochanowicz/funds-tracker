import { FC, KeyboardEvent, ReactNode, useRef } from 'react';
import styled from 'styled-components';

import { useRadioGroupContext } from './context';

interface IRadioProps {
  children: ReactNode;
  value: string;
}

const StyledRadio = styled.div`
  padding: 4px 8px;
  border: 0 solid transparent;
  border-radius: 5px;
  display: inline-block;
  position: relative;
  cursor: default;
  outline: none;
  color: black;

  &::before {
    position: relative;
    top: 1px;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='14' width='14' style='forced-color-adjust: auto;'%3E%3Ccircle cx='7' cy='7' r='6' stroke='rgb(0, 90, 156)' stroke-width='2' fill-opacity='0' /%3E%3C/svg%3E");
  }

  &[aria-checked='true'] {
    &::before {
      position: relative;
      top: 1px;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='14' width='14' style='forced-color-adjust: auto;'%3E%3Ccircle cx='7' cy='7' r='6' stroke='rgb(0, 90, 156)' stroke-width='2' fill-opacity='0' /%3E%3Ccircle cx='7' cy='7' r='3' fill='rgb(0, 90, 156)' stroke-opacity='0' /%3E%3C/svg%3E");
    }
  }

  &:hover {
    padding: 2px 6px;
    border: 2px solid #005a9c;
    background-color: #def;
    cursor: pointer;
  }
`;

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

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{ $isToggled: boolean }>`
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  border-radius: 22px;
  padding: 3px;
  cursor: pointer;
  border: 0;

  ${({ theme, $isToggled }) => css`
    background-color: ${theme.colors.gray300};
    transition: background-color ${theme.transition.primary} ease;

    &:focus-visible {
      outline: 2px solid ${theme.colors.blue};
    }

    ${$isToggled &&
    css`
      justify-content: flex-end;
      background-color: ${theme.colors.blue};
    `}
  `}
`;

export const Handle = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

export const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

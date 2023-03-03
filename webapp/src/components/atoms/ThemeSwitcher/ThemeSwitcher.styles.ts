import { motion, Transition } from 'framer-motion';
import { BiMoon, BiSun } from 'react-icons/bi';
import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  position: relative;
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  border-radius: 22px;
  padding: 3px;
  cursor: pointer;
  border: 0;

  ${({ theme: { isDark, colors, transition } }) => css`
    background-color: ${colors.black};
    outline-color: ${colors.blue};
    transition: background-color ${transition.primary} ease;

    ${isDark &&
    css`
      background-color: ${colors.white};
    `}
  `}
`;

export const Handle = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  ${({ theme: { isDark, colors } }) => css`
    background-color: ${isDark ? colors.black : colors.white};
  `}
`;

export const StyledBiMoon = styled(BiMoon)`
  position: absolute;
  top: calc(50% - 12px);
  font-size: 24px;
  left: 6px;
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledBiSun = styled(BiSun)`
  position: absolute;
  top: calc(50% - 12px);
  font-size: 24px;
  right: 6px;
  color: ${({ theme }) => theme.colors.white};
`;

export const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 40,
} satisfies Transition;

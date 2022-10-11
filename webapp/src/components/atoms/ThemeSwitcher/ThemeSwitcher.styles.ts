import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { BiMoon, BiSun } from 'react-icons/bi';

export const StyledButton = styled.button<{ isDark: boolean }>`
  position: relative;
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  border-radius: 22px;
  padding: 3px;
  cursor: pointer;
  transition: background-color 250ms ease;
  border: 0;

  ${({ theme, isDark }) => css`
    background-color: ${theme.colors.black};
    outline-color: ${theme.colors.blue};
    box-shadow: ${theme.shadows.box};

    ${isDark &&
    css`
      justify-content: flex-end;
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

export const StyledBiMoon = styled(BiMoon)`
  position: absolute;
  top: calc(50% - 12px);
  font-size: 24px;
  left: 6px;
  color: ${({ theme }) => theme.colors.white};
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
  damping: 30,
};

import { darken } from 'color2k';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface MenuProps {
  children: ReactNode;
  isInModal?: boolean;
}

export const Menu = styled(motion.div)<MenuProps>`
  overflow-y: auto;

  ${({ theme: { isDark, zIndex, radius, padding, colors, breakpoints }, isInModal }) => css`
    z-index: ${isInModal ? zIndex.menu.modal : zIndex.menu.default};
    border-radius: ${radius['0.7']};
    background-color: ${isDark ? darken(colors.gray200, 0.09) : colors.gray200};
    padding: ${padding.mediumY};
    color: ${colors.black};
    display: flex;
    flex-direction: column;

    ${breakpoints.phone.max} {
      max-height: 45vh;
    }

    &:focus-visible {
      outline: 2px solid ${colors.blue};
    }
  `}
`;

Menu.displayName = 'Menu';

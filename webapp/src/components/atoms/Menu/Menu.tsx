import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface MenuProps {
  children: ReactNode;
  minMenuWidth?: `${number}${'px' | 'rem'}`;
  isInModal?: boolean;
}

export const Menu = styled(motion.ul)<MenuProps>`
  max-height: 16rem;
  overflow-y: auto;

  ${({ theme: { isDark, zIndex, radius, padding, colors }, minMenuWidth, isInModal }) => css`
    z-index: ${isInModal ? zIndex.menu.modal : zIndex.menu.default};
    border-radius: ${radius['0.7']};
    background-color: ${isDark ? colors.gray100 : colors.gray200};
    padding: ${padding.mediumY};
    outline-color: ${colors.blue};
    color: ${colors.black};
    display: flex;
    flex-direction: column;

    ${minMenuWidth &&
    css`
      min-width: ${minMenuWidth};
    `}

    li {
      list-style: none;
    }
  `}
`;

Menu.displayName = 'Menu';

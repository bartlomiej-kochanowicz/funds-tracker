import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface MenuProps {
  children: ReactNode;
  minMenuWidth?: `${number}${'px' | 'rem'}`;
  isInModal?: boolean;
}

export const Menu = styled(motion.ul)<MenuProps>`
  max-height: 14rem;
  overflow-y: auto;

  ${({ theme, minMenuWidth, isInModal }) => css`
    z-index: ${isInModal ? theme.zIndex.menu.modal : theme.zIndex.menu.default};
    border-radius: ${theme.radius.secondary};
    background-color: ${theme.colors.gray200};
    padding: ${theme.padding.mediumY};
    outline-color: ${theme.colors.blue};
    color: ${theme.colors.black};
    box-shadow: ${theme.shadows.box};
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

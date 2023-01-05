import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface GridProps {
  children: ReactNode;
  columns?: {
    desktop: number;
    tablet: number;
    phone: number;
  };
}

export const Grid = styled.div<GridProps>`
  display: grid;

  ${({ theme, columns }) => css`
    grid-template-columns: repeat(${columns?.desktop ?? 1}, 1fr);
    grid-gap: ${theme.spacing.medium};

    ${theme.breakpoints.tablet.max} {
      grid-template-columns: repeat(${columns?.tablet ?? 1}, 1fr);
    }

    ${theme.breakpoints.phone.max} {
      grid-template-columns: repeat(${columns?.phone ?? 1}, 1fr);
    }
  `}
`;

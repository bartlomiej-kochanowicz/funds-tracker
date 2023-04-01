import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { paddingMixin, PaddingMixinProps } from 'styles/mixins';
import { Colors, Radius } from 'styles/styled';

interface BoxProps extends PaddingMixinProps {
  children: ReactNode;
  backgroundColor?: Colors;
  borderRadius?: Radius;
  hoverBackgroundColor?: Colors;
}

export const Box = styled.div<BoxProps>`
  ${paddingMixin}

  ${({ theme, backgroundColor, borderRadius, hoverBackgroundColor }) => css`
    ${backgroundColor &&
    css`
      background-color: ${theme.colors[backgroundColor]};
    `}

    ${borderRadius &&
    css`
      border-radius: ${theme.radius[borderRadius]};
    `}

    ${hoverBackgroundColor &&
    css`
      transition: ${theme.transition.primary};

      &:hover {
        background-color: ${theme.colors[hoverBackgroundColor]};
      }
    `}
  `}
`;

Box.displayName = 'Box';

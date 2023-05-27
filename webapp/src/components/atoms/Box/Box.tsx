import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { paddingMixin, PaddingMixinProps } from 'styles/mixins';
import { Colors, Radius } from 'styles/styled';

interface BoxProps extends PaddingMixinProps {
  children: ReactNode;
  backgroundColor?: Colors;
  borderRadius?: Radius;
  hoverBackgroundColor?: Colors;
  flex?: boolean;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'center' | 'flex-start' | 'flex-end';
}

export const Box = styled.div<BoxProps>`
  ${paddingMixin}

  ${({
    theme,
    backgroundColor,
    borderRadius,
    hoverBackgroundColor,
    flex,
    flexDirection,
    justifyContent,
    alignItems,
  }) => css`
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

    ${flex &&
    css`
      display: flex;

      ${flexDirection &&
      css`
        flex-direction: ${flexDirection};
      `}

      ${justifyContent &&
      css`
        justify-content: ${justifyContent};
      `}

      ${alignItems &&
      css`
        align-items: ${alignItems};
      `}
    `}
  `}
`;

Box.displayName = 'Box';

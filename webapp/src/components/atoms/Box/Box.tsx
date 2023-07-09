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
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'start';
  flexGrow?: number;
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
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
    flexGrow,
    width,
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

    ${width &&
    css`
      width: ${width};
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

      ${flexGrow &&
      css`
        flex-grow: ${flexGrow};
      `}
    `}
  `}
`;

Box.displayName = 'Box';

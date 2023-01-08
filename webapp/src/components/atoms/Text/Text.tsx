import styled, { css } from 'styled-components';
import {
  fontable,
  FontableProps,
  marginMixin,
  MarginMixinProps,
  paddingMixin,
  PaddingMixinProps,
} from 'styles/mixins';

type TextProps = {
  display?: 'inline' | 'inline-block' | 'block';
  maxWidth?: `${string}px`;
} & FontableProps &
  MarginMixinProps &
  PaddingMixinProps;

export const Text = styled.span<TextProps>`
  ${fontable}
  ${marginMixin}
  ${paddingMixin}

  ${({ display = 'inline' }) => css`
    display: ${display};
  `}

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
      width: ${maxWidth};
      white-space: nowrap;
    `}
`;

Text.displayName = 'Text';

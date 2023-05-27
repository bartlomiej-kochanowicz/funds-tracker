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
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
} & FontableProps &
  MarginMixinProps &
  PaddingMixinProps;

export const Text = styled.span<TextProps>`
  ${fontable}
  ${marginMixin}
  ${paddingMixin}

  ${({ display = 'inline', width }) => css`
    display: ${display};

    ${width &&
    css`
      width: ${width};
    `}
  `}
`;

Text.displayName = 'Text';

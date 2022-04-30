import styled, { css } from 'styled-components';
import { fontable, FontableProps, marginable, MarginableProps } from 'styles/mixins';

type TextProps = {
  display: 'inline' | 'inline-block' | 'block';
} & FontableProps &
  MarginableProps;

export const Text = styled.span<TextProps>`
  ${fontable}
  ${marginable}

  ${({ display = 'inline' }) => css`
    display: ${display};
  `}
`;

Text.displayName = 'Text';

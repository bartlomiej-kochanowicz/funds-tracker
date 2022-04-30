import styled from 'styled-components';
import { fontable, FontableProps } from 'styles/mixins';

export type Size = 'small' | 'medium' | 'large';
export type Color = 'black' | 'white' | 'navy' | 'gray' | 'blue';

type TextProps = {
  size?: Size;
  color?: Color;
} & FontableProps;

export const Text = styled.span<TextProps>`
  ${fontable}
`;

Text.displayName = 'Text';

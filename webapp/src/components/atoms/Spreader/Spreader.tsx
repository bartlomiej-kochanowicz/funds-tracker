import styled, { css, DefaultTheme } from 'styled-components';

export type Spread = keyof DefaultTheme['spacing'];

export type SpreaderProps = {
  $spread?: Spread;
  'data-testid'?: string;
};

export const Spreader = styled.span.attrs(props => ({
  ...props,
  'data-testid': 'spreader',
}))<SpreaderProps>`
  display: block;

  ${({ theme: { spacing }, $spread = '1' }) => css`
    padding: 0 ${spacing[$spread]};
  `}
`;

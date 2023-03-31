import styled, { css, DefaultTheme } from 'styled-components';

export type Spread = keyof DefaultTheme['spacing'];

export type SpreaderProps = {
  spread?: Spread;
  'data-testid'?: string;
};

const StyledSpreader = styled.span<SpreaderProps>`
  display: block;

  ${({ theme: { spacing }, spread = '1' }) => css`
    padding: 0 ${spacing[spread]};
  `}
`;

export const Spreader = ({ spread, 'data-testid': dataTestId = 'spreader' }: SpreaderProps) => (
  <StyledSpreader
    spread={spread}
    data-testid={dataTestId}
  />
);

Spreader.displayName = 'Spreader';

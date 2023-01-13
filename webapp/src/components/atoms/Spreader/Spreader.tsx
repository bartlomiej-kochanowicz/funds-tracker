import styled, { css, DefaultTheme } from 'styled-components';

export type Spread = keyof DefaultTheme['spacing'];

const defaultProps = {
  spread: 'medium' as Spread,
  'data-testid': 'spreader',
};

export type SpreaderProps = {
  spread?: Spread;
  'data-testid'?: string;
} & typeof defaultProps;

const StyledSpreader = styled.span<SpreaderProps>`
  display: block;

  ${({ theme: { spacing }, spread }) => css`
    padding: 0 ${spacing[spread]};
  `}
`;

export const Spreader = ({ spread, 'data-testid': dataTestId }: SpreaderProps) => (
  <StyledSpreader
    spread={spread}
    data-testid={dataTestId}
  />
);

Spreader.displayName = 'Spreader';

Spreader.defaultProps = defaultProps;

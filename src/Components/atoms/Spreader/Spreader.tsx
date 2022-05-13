import styled, { css, DefaultTheme } from 'styled-components';

export type Spread = keyof DefaultTheme['spacing'];

const defaultProps = {
  space: 'medium' as Spread,
  'data-testid': 'spreader',
};

export type SpreaderProps = {
  space?: Spread;
  'data-testid'?: string;
} & typeof defaultProps;

const StyledSpreader = styled.span<SpreaderProps>`
  ${({ theme: { spacing }, space }) => css`
    padding: 0 ${spacing[space]};
  `}
`;

export const Spreader = ({ space, 'data-testid': dataTestId }: SpreaderProps) => (
  <StyledSpreader
    space={space}
    data-testid={dataTestId}
  />
);

Spreader.displayName = 'Spreader';

Spreader.defaultProps = defaultProps;

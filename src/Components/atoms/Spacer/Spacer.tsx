import styled, { css, DefaultTheme } from 'styled-components';

const defaultProps = {
  space: 'medium',
  'data-testid': 'spacer',
};

export type SpacerProps = {
  space?: keyof DefaultTheme['spacing'];
  'data-testid'?: string;
} & typeof defaultProps;

const StyledSpacer = styled.span<SpacerProps>`
  ${({ theme: { spacing }, space }) => css`
    padding: ${spacing[space]} 0;
  `}
`;

export const Spacer = ({ space, 'data-testid': dataTestId }: SpacerProps) => (
  <StyledSpacer
    space={space}
    data-testid={dataTestId}
  />
);

Spacer.displayName = 'Spacer';

Spacer.defaultProps = defaultProps;

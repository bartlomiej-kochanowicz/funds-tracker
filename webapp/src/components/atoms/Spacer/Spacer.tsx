import styled, { css, DefaultTheme } from 'styled-components';

type Space = keyof DefaultTheme['spacing'];

const defaultProps = {
  space: 'medium' as Space,
  'data-testid': 'spacer',
};

type SpacerProps = {
  space?: Space;
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

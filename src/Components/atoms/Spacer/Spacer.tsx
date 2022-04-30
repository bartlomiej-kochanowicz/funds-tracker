import styled, { css, DefaultTheme } from 'styled-components';

export type SpacerProps = {
  space: keyof DefaultTheme['spacing'];
};

export const Spacer = styled.span<SpacerProps>`
  ${({ theme: { spacing }, space }) => css`
    padding: ${spacing[space]} 0;
  `}
`;

Spacer.defaultProps = {
  space: 'medium',
};

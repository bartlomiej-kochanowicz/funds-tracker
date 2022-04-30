import styled, { css, DefaultTheme } from 'styled-components';

export type SpreaderProps = {
  spread: keyof DefaultTheme['spacing'];
};

export const Spreader = styled.span<SpreaderProps>`
  ${({ theme: { spacing }, spread }) => css`
    padding: 0 ${spacing[spread]};
  `}
`;

Spreader.defaultProps = {
  spread: 'medium',
};

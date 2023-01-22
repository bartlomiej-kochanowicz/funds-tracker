import { Row } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Row).withConfig({
  shouldForwardProp: prop => !['hasBackground'].includes(prop),
})<{ hasBackground: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${({ theme: { colors, spacing, zIndex }, hasBackground }) => css`
    padding: ${spacing.medium};
    z-index: ${zIndex.bottomBar};

    ${hasBackground &&
    css`
      background-color: ${colors.gray100};
      border-bottom: 1px solid ${colors.gray200};
    `}
  `}
`;

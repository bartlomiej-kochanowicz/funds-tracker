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
    backdrop-filter: blur(10px);
    transition: all 0.3s ease-in-out;

    ${hasBackground &&
    css`
      background: ${colors.mobileTransparent};
      border-bottom: 1px solid ${colors.gray200};
    `}
  `}
`;

import { darken } from 'color2k';
import { Column } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const StyledColumn = styled(Column)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  height: var(--doc-height);

  ${({ theme: { isDark, colors, zIndex, shadows, spacing } }) => css`
    background-color: ${isDark ? darken(colors.gray100, 0.03) : colors.white};
    z-index: ${zIndex.sidebar};
    padding: ${spacing.huge} 0 ${spacing.huge} ${spacing.huge};
    box-shadow: ${shadows.box};
    border-right: 1px solid ${colors.gray200};
  `}
`;

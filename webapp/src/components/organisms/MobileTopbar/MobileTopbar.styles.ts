import { Row } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Row).withConfig({
  shouldForwardProp: prop => !['hasBorder'].includes(prop),
})<{ hasBorder: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${({ theme: { colors, spacing, zIndex }, hasBorder }) => css`
    padding: ${spacing.medium};
    z-index: ${zIndex.bottomBar};
    background-color: ${colors.gray100};

    ${hasBorder &&
    css`
      border-bottom: 1px solid ${colors.gray200};
    `}
  `}
`;

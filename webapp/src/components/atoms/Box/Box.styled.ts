import styled, { css } from 'styled-components';
import { paddingMixin } from 'styles/mixins';
import { Colors, Radius } from 'styles/styled';

export const StyledWrapper = styled.div<{ backgroundColor?: Colors; borderRadius?: Radius }>`
  ${paddingMixin}

  ${({ theme, backgroundColor, borderRadius }) => css`
    ${backgroundColor &&
    css`
      background-color: ${theme.colors[backgroundColor]};
    `}

    ${borderRadius &&
    css`
      border-radius: ${theme.radius[borderRadius]};
    `}
  `}
`;

import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ gridTemplateColumns: string }>`
  display: grid;

  ${({ gridTemplateColumns }) => css`
    grid-template-columns: ${gridTemplateColumns};
  `}
`;

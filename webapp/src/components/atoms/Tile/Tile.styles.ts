import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    background: ${theme.colors.blue};
    background: ${theme.gradients.blue}};
    border-radius: ${theme.radius['1.25']};

    svg {
      fill: ${theme.colors.white};
      font-size: ${theme.font.size['1.5']}};
    }
  `}
`;

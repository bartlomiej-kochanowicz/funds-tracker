import styled, { css } from 'styled-components';

export const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledSelect = styled.select`
  background-color: transparent;
  ${({ theme: { radius, colors, padding } }) => css`
    border-radius: ${radius['0.375']};
    color: ${colors.text};
    padding: ${padding.tiny};
    outline-color: ${colors.blue};
    border: 0;
    font-weight: 700;

    &:focus-visible {
      outline: 2px solid ${colors.blue};
    }
  `};
`;

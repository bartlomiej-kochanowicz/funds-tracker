import styled from 'styled-components';
// import { transparentize } from 'color2k';

export const Container = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const Marker = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 0.3rem;

  svg {
    opacity: 0;
    fill: #fff;
  }
`;

export const Input = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;

  &:checked {
    + ${Marker} {
      background-color: ${({ theme }) => theme.colors.blue};
      border-color: ${({ theme }) => theme.colors.blue};

      svg {
        opacity: 1;
      }
    }
  }
`;

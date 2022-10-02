import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.size['1.5']};
`;

import styled from 'styled-components';

export const ApperienceWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.padding.medium};
`;

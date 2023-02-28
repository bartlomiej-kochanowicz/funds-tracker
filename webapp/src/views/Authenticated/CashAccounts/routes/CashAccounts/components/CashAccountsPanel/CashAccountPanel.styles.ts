import styled from 'styled-components';

export const RenameButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.font.weight['700']};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    cursor: pointer;
  }
`;

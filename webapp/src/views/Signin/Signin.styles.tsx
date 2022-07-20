import styled from 'styled-components';
import { Column } from 'simple-flexbox';
import { FullscreenClear } from 'layouts/FullscreenClear';

export const StyledFullscreenClear = styled(FullscreenClear)`
  background: ${({ theme }) => theme.colors.white};
`;

export const Wrapper = styled(Column)`
  width: 350px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

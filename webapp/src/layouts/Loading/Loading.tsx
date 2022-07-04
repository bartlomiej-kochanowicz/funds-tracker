import { Loader } from 'components/atoms/Loader';
import { Row } from 'simple-flexbox';
import styled from 'styled-components';

const Wrapper = styled(Row)`
  width: 100%;
  height: var(--doc-height);
`;

export const Loading = () => (
  <Wrapper
    justifyContent="center"
    alignItems="center"
  >
    <Loader size="large" />
  </Wrapper>
);

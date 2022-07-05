import { Loader } from 'components/atoms/Loader';
import { FC } from 'react';
import { Row } from 'simple-flexbox';
import styled from 'styled-components';

const Wrapper = styled(Row)`
  width: 100%;
  height: var(--doc-height);
`;

export const Loading: FC = () => (
  <Wrapper
    justifyContent="center"
    alignItems="center"
  >
    <Loader size="large" />
  </Wrapper>
);

Loading.displayName = 'LayoutLoading';

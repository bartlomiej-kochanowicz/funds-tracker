import { Box } from 'components/atoms';
import { Loader } from 'components/atoms/Loader';
import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled(Box).attrs({
  $flex: true,
  $justifyContent: 'center',
  $alignItems: 'center',
})`
  width: 100%;
  height: var(--doc-height);
`;

export const FullscreenLoading: FC = () => (
  <Wrapper>
    <Loader size="large" />
  </Wrapper>
);

FullscreenLoading.displayName = 'FullscreenLoading';

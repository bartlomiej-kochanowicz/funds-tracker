import { ReactNode } from 'react';
import { InnerWrapper, Wrapper } from './FullscreenClear.styles';

interface FullscreenClearProps {
  children: ReactNode;
}

export const FullscreenClear = ({ children, ...rest }: FullscreenClearProps) => (
  <Wrapper
    alignItems="center"
    justifyContent="center"
    {...rest}
  >
    <InnerWrapper alignItems="stretch">{children}</InnerWrapper>
  </Wrapper>
);

FullscreenClear.displayName = 'LayoutFullscreenClear';

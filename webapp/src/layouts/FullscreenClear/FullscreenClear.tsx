import styled, { css } from 'styled-components';
import { Column } from 'simple-flexbox';
import { ReactNode } from 'react';

export const Wrapper = styled(Column)`
  width: 100%;
  height: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    padding: ${theme.padding.medium};
    background: ${theme.colors.white};
  `}
`;

export const InnerWrapper = styled(Column)`
  width: 350px;
`;

interface FullscreenClearProps {
  children: ReactNode;
}

export const FullscreenClear = ({ children, ...rest }: FullscreenClearProps) => (
  <Wrapper
    alignItems="center"
    justifyContent="center"
    {...rest}
  >
    {console.log(rest)}
    <InnerWrapper alignItems="stretch">{children}</InnerWrapper>
  </Wrapper>
);

FullscreenClear.displayName = 'LayoutFullscreenClear';

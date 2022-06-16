import { FC } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as LogoHorizontal } from 'assets/logo/logo-name-horizontal.svg';
import { Column, Row } from 'simple-flexbox';
import { Heading } from 'components/atoms/Heading';
import { Spacer } from 'components/atoms/Spacer';

const Wrapper = styled(Row)`
  width: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    background: ${theme.gradients.secondary};
  `}
`;

export const Home: FC = () => (
  <Wrapper
    justifyContent="center"
    alignItems="center"
  >
    <Column alignItems="center">
      <div>
        <LogoHorizontal width="500px" />
      </div>

      <Spacer />

      <Heading
        level="h1"
        fontColor="light"
      >
        Coming summer 2022...
      </Heading>
    </Column>
  </Wrapper>
);

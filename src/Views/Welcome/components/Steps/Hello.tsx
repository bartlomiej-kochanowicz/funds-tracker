import { FC } from 'react';
import styled from 'styled-components';
import { Column } from 'simple-flexbox';
import { Heading } from 'components/atoms/Heading';
import { Button } from 'components/atoms/Button';
import { Spacer } from 'components/atoms/Spacer';
import { ReactComponent as Wallet } from 'assets/images/wallet.svg';

const Wrapper = styled(Column)`
  width: 100%;
  height: var(--doc-height);
  background-color: ${({ theme }) => theme.colors.pink};
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const Hello: FC = () => (
  <Wrapper
    justifyContent="center"
    alignItems="center"
  >
    <Wallet />

    <Spacer space="small" />

    <Heading
      fontColor="white"
      level="h1"
      fontSize="huge"
      textAlign="center"
      textShadow
    >
      Simple Passive Wallet
    </Heading>

    <Spacer space="small" />

    <Button size="large">Get started Now</Button>
  </Wrapper>
);

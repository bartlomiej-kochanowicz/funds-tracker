import { FC } from 'react';
import styled from 'styled-components';
import { Column } from 'simple-flexbox';
import { Heading } from 'components/atoms/Heading';
import { Button } from 'components/atoms/Button';

const Wrapper = styled.div`
  width: 100%;
  height: var(--doc-height);
  background-color: ${({ theme }) => theme.colors.pink};
`;

export const Hello: FC = () => (
  <Wrapper>
    <Column
      justifyContent="center"
      alignItems="center"
    >
      <Heading
        fontColor="white"
        level="h1"
        fontSize="huge"
        textShadow
      >
        Simple Passive Wallet
      </Heading>

      <Button size="large">Get started Now</Button>
    </Column>
  </Wrapper>
);

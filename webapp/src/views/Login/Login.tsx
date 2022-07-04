import styled from 'styled-components';
import { Input } from 'components/atoms/Input';
import { Spacer } from 'components/atoms/Spacer';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { Column } from 'simple-flexbox';
import { Button } from 'components/atoms/Button';
import { Heading } from 'components/atoms/Heading';
import { Text } from 'components/atoms/Text';

const Wrapper = styled(Column)`
  width: 350px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Login = () => (
  <FullscreenClear background="primary">
    <Wrapper alignItems="stretch">
      <Heading textAlign="center">Sign in</Heading>

      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="darkGray"
        textAlign="center"
      >
        Welcome back! You can continue to manage your finances
      </Text>

      <Spacer space="large" />

      <Form>
        <Input placeholder="Enter Email Adress" />

        <Spacer />

        <Input placeholder="Password" />

        <Spacer />

        <Button
          color="black"
          width="auto"
        >
          Sign In
        </Button>
      </Form>
    </Wrapper>
  </FullscreenClear>
);

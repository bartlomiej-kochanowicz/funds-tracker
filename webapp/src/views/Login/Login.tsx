import { Button } from 'components/atoms/Button';
import { Spacer } from 'components/atoms/Spacer';
import { Input } from 'components/atoms/Input';
import { Heading } from 'components/atoms/Heading';
import { Text } from 'components/atoms/Text';
import { StyledFullscreenClear, Wrapper, Form } from './Login.styles';

export const Login = () => (
  <StyledFullscreenClear
    alignItems="center"
    justifyContent="center"
  >
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
  </StyledFullscreenClear>
);

import { SIGNIN } from 'apollo/mutations';
import { EMAIL_EXIST } from 'apollo/query';
import { useEffect } from 'react';
import { screen, waitFor } from 'utils/test-utils';
import { Signin } from '../Signin';
import { SigninPO } from './Signin.po';

jest.mock('react-google-recaptcha-v3', () => ({
  GoogleReCaptcha: ({
    onVerify,
    refreshReCaptcha,
  }: {
    onVerify: (token: string) => string;
    refreshReCaptcha: boolean;
  }) => {
    useEffect(() => {
      onVerify('token');
    }, [onVerify, refreshReCaptcha]);

    return null;
  },
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Signin tests', () => {
  it.only('sign in properly', async () => {
    // given
    const mocks = [
      {
        request: {
          query: EMAIL_EXIST,
          variables: {
            data: {
              email: 'test@email.xyz',
              token: 'token',
            },
          },
        },
        result: {
          data: {
            emailExist: {
              exist: true,
            },
          },
        },
      },
      {
        request: {
          query: SIGNIN,
          variables: {
            data: {
              email: 'test@email.xyz',
              password: 'TestPassword1122',
              token: 'token',
            },
          },
        },
        result: {
          data: {
            signinLocal: {
              uuid: '78c3faea-0a04-4949-90b8-7589b6572d22',
              name: 'test123',
            },
          },
        },
      },
    ];

    const signinPO = SigninPO.render(Signin, mocks);

    // when
    await signinPO.setEmail('test@email.xyz');

    // then
    signinPO.expectButtonHasProperText('Next');
    // when
    await signinPO.submitForm();

    // then
    await signinPO.expectLoaderDisappeared();
    signinPO.expectButtonHasProperText('Sign in');

    // when
    await signinPO.setPassword('TestPassword1122');
    await signinPO.submitForm();

    // then
    await waitFor(() => signinPO.expectSuccessCallback(mockNavigate).toHaveBeenCalled());
  });

  it('shows error when email is invalid', async () => {
    // given
    const signinPO = SigninPO.render(Signin);

    // when
    await signinPO.setEmail('test');
    await signinPO.submitForm();

    // then
    await signinPO.expectTextDisplayed('Invalid email address!');
  });

  it('shows error when email does not exist', async () => {
    // fail.checkEmail();

    // given
    const signinPO = SigninPO.render(Signin);

    // when
    await signinPO.setEmail('test@email.xyz');
    await signinPO.submitForm();

    // then
    await signinPO.expectLoaderDisappeared();
    await signinPO.expectTextDisplayed('Account does not exist');
  });

  it('shows error when password is wrond', async () => {
    // pass.checkEmail();
    // fail.signin();

    // given
    const signinPO = SigninPO.render(Signin);

    // when
    await signinPO.setEmail('test@email.xyz');

    // then
    signinPO.expectButtonHasProperText('Next');

    // when
    await signinPO.submitForm();

    // then
    await signinPO.expectLoaderDisappeared();
    signinPO.expectButtonHasProperText('Sign in');

    // when
    await signinPO.setPassword('TestPassword1122');
    await signinPO.submitForm();

    // then
    await signinPO.expectLoaderDisappeared();
    await signinPO.expectTextDisplayed('Wrong password');
  });
});

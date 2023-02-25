import { GraphQLError } from 'graphql';
import { SIGNIN } from 'graphql/mutations';
import { SEND_CODE } from 'graphql/mutations/SendCode';
import { EMAIL_EXIST } from 'graphql/query';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import { useEffect } from 'react';
import { ROUTES } from 'routes/paths';
import { waitFor } from 'utils/test-utils';

import { Signin } from '../Signin';
import { SigninPO } from './Signin.po';

const mockedShowSuccessToast = showSuccessToast as jest.MockedFunction<typeof showSuccessToast>;
const mockedShowErrorToast = showErrorToast as jest.MockedFunction<typeof showErrorToast>;

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

jest.mock('helpers/showToast', () => ({ showErrorToast: jest.fn(), showSuccessToast: jest.fn() }));

describe('Signin tests', () => {
  it('sign in properly', async () => {
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
              success: true,
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
    await waitFor(() =>
      signinPO.expectSuccessCallback(mockNavigate).toHaveBeenCalledWith(ROUTES.DASHBOARD.HOME),
    );
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
              exist: false,
            },
          },
        },
      },
    ];

    const signinPO = SigninPO.render(Signin, mocks);

    // when
    await signinPO.setEmail('test@email.xyz');
    await signinPO.submitForm();

    // then
    await signinPO.expectLoaderDisappeared();
    await signinPO.expectTextDisplayed('Account does not exist');
  });

  it('shows error when password is wrond', async () => {
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
          errors: [new GraphQLError('Wrong password')],
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
    await signinPO.expectLoaderDisappeared();
    await signinPO.expectTextDisplayed('Wrong password');
  });

  it('send code and redirect when email is not confirmed', async () => {
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
          errors: [new GraphQLError('User not confirmed.')],
        },
      },
      {
        request: {
          query: SEND_CODE,
          variables: {
            data: {
              email: 'test@email.xyz',
              token: 'token',
            },
          },
        },
        result: {
          data: {
            sendCode: {
              success: true,
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
    await signinPO.expectLoaderDisappeared();
    await signinPO.expectTextDisplayed('User not confirmed.');
    await waitFor(() =>
      signinPO
        .expectSuccessCallback(mockNavigate)
        .toHaveBeenCalledWith(ROUTES.SIGNUP.CONFIRM, { state: { email: 'test@email.xyz' } }),
    );

    await waitFor(() =>
      expect(mockedShowSuccessToast).toHaveBeenCalledWith(
        'Confirmation code has been sent to your email.',
      ),
    );
  });

  it('send code and redirect when email is not confirmed - sending failure', async () => {
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
          errors: [new GraphQLError('User not confirmed.')],
        },
      },
      {
        request: {
          query: SEND_CODE,
          variables: {
            data: {
              email: 'test@email.xyz',
              token: 'token',
            },
          },
        },
        result: {
          errors: [new GraphQLError('Internal server error.')],
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
    await signinPO.expectLoaderDisappeared();
    await signinPO.expectTextDisplayed('User not confirmed.');
    await waitFor(() =>
      signinPO
        .expectSuccessCallback(mockNavigate)
        .toHaveBeenCalledWith(ROUTES.SIGNUP.CONFIRM, { state: { email: 'test@email.xyz' } }),
    );

    await waitFor(() =>
      expect(mockedShowErrorToast).toHaveBeenCalledWith(
        'Code sending failed. Please try again later.',
      ),
    );
  });
});

import { useEffect } from 'react';
import { waitFor } from 'utils/test-utils';
import { checkEmail } from 'services/auth/checkEmail';
import { signin } from 'services/auth/signin';
import { getAccount } from 'services/auth/account';
import { Signin } from '../Signin';
import { SigninPO } from './Signin.po';

jest.mock('services/auth/checkEmail', () => ({
  checkEmail: jest.fn(),
}));

jest.mock('services/auth/signin', () => ({ signin: jest.fn() }));

jest.mock('services/auth/account', () => ({ getAccount: jest.fn() }));

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
  const pass = {
    checkEmail: () => (checkEmail as jest.Mock).mockResolvedValue({ data: { exist: true } }),
    getAccount: () =>
      (getAccount as jest.Mock).mockResolvedValue({
        data: { uuid: '', email: '', createdAt: new Date('07-12-2000').toString() },
      }),
  };

  const fail = {
    checkEmail: () => (checkEmail as jest.Mock).mockResolvedValue({ data: { exist: false } }),
    signin: () =>
      (signin as jest.Mock).mockRejectedValue({
        response: { data: { message: 'Wrong password' } },
      }),
    getAccount: () =>
      (getAccount as jest.Mock).mockResolvedValue({
        data: { uuid: '', email: '', createdAt: new Date('07-12-2000').toString() },
      }),
  };

  afterEach(() => {
    (checkEmail as jest.Mock).mockReset();
    (signin as jest.Mock).mockReset();
    (getAccount as jest.Mock).mockReset();
  });

  it('sign in properly', async () => {
    pass.checkEmail();
    pass.getAccount();

    // given
    const signinPO = SigninPO.render(Signin, mockNavigate);

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
    await waitFor(() => signinPO.expectSuccessCallback.toHaveBeenCalled());
  });

  it('shows error when email is invalid', async () => {
    // given
    const signinPO = SigninPO.render(Signin, mockNavigate);

    // when
    await signinPO.setEmail('test');
    await signinPO.submitForm();

    // then
    await signinPO.expectTextDisplayed('Invalid email address!');
  });

  it('shows error when email does not exist', async () => {
    fail.checkEmail();

    // given
    const signinPO = SigninPO.render(Signin, mockNavigate);

    // when
    await signinPO.setEmail('test@email.xyz');
    await signinPO.submitForm();

    // then
    await signinPO.expectLoaderDisappeared();
    await signinPO.expectTextDisplayed('Account does not exist');
  });

  it('shows error when password is wrond', async () => {
    pass.checkEmail();
    fail.signin();

    // given
    const signinPO = SigninPO.render(Signin, mockNavigate);

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

import { waitFor } from 'utils/test-utils';
import { checkEmail } from 'services/auth/checkEmail';
import { getAccount } from 'services/auth/account';
import { Signin } from '../Signin';
import { SigninPO } from './Signin.po';

jest.mock('services/auth/checkEmail', () => ({
  checkEmail: jest.fn(),
}));

jest.mock('services/auth/signin', () => ({ signin: jest.fn() }));

jest.mock('services/auth/account', () => ({ getAccount: jest.fn() }));

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

  it('sign in properly', async () => {
    pass.checkEmail();
    pass.getAccount();

    // given
    const signinPO = SigninPO.render(Signin, mockNavigate);

    // when
    signinPO.setEmail('test@email.xyz');

    // then
    signinPO.expectButtonHasProperText('Next');

    // when
    signinPO.setEmail('test@email.xyz');
    signinPO.submitForm();

    // then
    await signinPO.expectLoaderDisappeared();
    signinPO.expectButtonHasProperText('Sign in');

    // when
    signinPO.setPassword('TestPassword1122');
    signinPO.submitForm();

    await waitFor(() => signinPO.expectSuccessCallback.toHaveBeenCalled());
  });
});

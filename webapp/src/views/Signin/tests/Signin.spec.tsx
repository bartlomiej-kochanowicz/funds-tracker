import { screen } from 'utils/test-utils';
import { checkEmail } from 'services/auth/checkEmail';
import { Signin } from '../Signin';
import { SigninPO } from './Signin.po';

jest.mock('services/auth/checkEmail', () => ({
  checkEmail: jest.fn(),
}));

jest.mock('services/auth/signin', () => ({ signin: jest.fn() }));

describe('Signin tests', () => {
  const pass = {
    checkEmail: () => (checkEmail as jest.Mock).mockResolvedValue({ data: { exist: true } }),
  };

  it('sign in properly', async () => {
    pass.checkEmail();

    // given
    const signinPO = SigninPO.render(Signin);

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

    screen.debug(undefined, Infinity);
  });
});

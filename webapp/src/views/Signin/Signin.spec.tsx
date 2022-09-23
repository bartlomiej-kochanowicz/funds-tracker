import { screen } from 'utils/test-utils';
import { Signin } from './Signin';
import { SigninPO } from './Signin.po';

// jest.mock('services/auth/signin');

describe('Signin tests', () => {
  it('sign in properly', () => {
    // given
    const signinPO = SigninPO.render(Signin);

    // when
    signinPO.setEmail('test@email.xyz');

    // then
    signinPO.expectButtonHasProperText('Next');

    // when
    signinPO.setEmail('test@email.xyz');

    screen.debug(undefined, Infinity);
  });
});

import { screen } from 'utils/test-utils';
import { Signin } from './Signin';
import { SigninPO } from './Signis.po';

// jest.mock('services/auth/signin');

describe('Signin tests', () => {
  it('sign in properly', () => {
    const signinPO = SigninPO.render(Signin);

    screen.debug(undefined, Infinity);
  });
});

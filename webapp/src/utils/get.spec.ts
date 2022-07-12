import { get } from './get';

type Address = {
  postCode: string;
  street: string[];
};

export type UserInfo = {
  address: Address;
  previousAddress?: Address;
};

export const user: UserInfo = {
  address: {
    postCode: 'SW1P 3PA',
    street: ['20 Deans Yd'],
  },
};

describe('typed get', () => {
  it('should get nested value from an object', () => {
    expect(get(user, 'address.postCode')).toBe('SW1P 3PA');
  });

  it('should return a value from a list', () => {
    expect(get(user, 'address.street.0')).toBe('20 Deans Yd');
    expect(get(user, 'address.street[0]')).toBe('20 Deans Yd');
    expect(get(user, 'address.street.1')).toBeUndefined();
  });

  it('should return undefined if field does not exist', () => {
    expect(get(user, 'phone.number')).toBeUndefined();
  });

  it('should return default value if field does not exist', () => {
    expect(get(user, 'previousAddress.postCode', 'E1 2BC')).toBe('E1 2BC');
  });
});

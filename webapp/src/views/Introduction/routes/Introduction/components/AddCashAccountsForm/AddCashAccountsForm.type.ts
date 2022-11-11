import type { Currencies } from 'types/currencies.type';

export type DefaultValues = {
  accounts: {
    name: string;
    currency: Currencies;
  }[];
};

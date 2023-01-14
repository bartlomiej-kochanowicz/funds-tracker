import type { Currencies } from 'types/currencies.type';

export type DefaultValues = {
  cashAccounts: {
    name: string;
    currency: Currencies;
  }[];
};

import { Currencies } from 'constants/selectors/currencies';

export type DefaultValues = {
  accounts: {
    name: string;
    currency: Currencies;
  }[];
};

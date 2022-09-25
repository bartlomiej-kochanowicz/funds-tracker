import { ValueOf } from 'types/mapped-types.type';

export const CHF = 'CHF';
export const EUR = 'EUR';
export const GBP = 'GBP';
export const PLN = 'PLN';
export const USD = 'USD';

export const CURRENCIES = {
  CHF,
  EUR,
  GBP,
  USD,
  PLN,
} as const;

export const CURRENCIES_ARRAY = [CHF, EUR, GBP, USD, PLN];

export type Currencies = ValueOf<typeof CURRENCIES>;

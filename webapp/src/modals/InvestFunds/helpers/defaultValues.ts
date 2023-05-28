import { SearchInstrument } from '__generated__/graphql';

export const defaultValues = {
  instrument: {
    Code: '',
    Exchange: '',
    Name: '',
    Type: '',
    Country: '',
    Currency: '',
    ISIN: undefined,
    previousClose: 0,
  },
  portfolio: '',
  date: new Date(),
  quantity: 0,
  price: 0,
  commission: 0,
  commission_type: '%',
  transaction_cost: 0,
} as const;

export type InvestFundsFormValues = {
  instrument: SearchInstrument;
  portfolio: string;
  date: Date;
  quantity: number;
  price: number;
  commission: number;
  commission_type: '%' | 'value';
  transaction_cost: number;
};

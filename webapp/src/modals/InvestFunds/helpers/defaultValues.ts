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
  price: '',
  commission: '',
  commission_type: '%',
  transaction_cost: '',
} as const;

export type InvestFundsFormValues = {
  instrument: SearchInstrument;
  portfolio: string;
  date: Date;
  quantity: number;
  price: string;
  commission: string | number;
  commission_type: '%' | 'amount';
  transaction_cost: string;
};

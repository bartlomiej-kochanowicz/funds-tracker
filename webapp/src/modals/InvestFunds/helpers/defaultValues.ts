import { Instrument, SearchInstrument } from '__generated__/graphql';

export const defaultValues = {
  instrumentType: Instrument.Stocks,
  instrument: {
    Code: '',
    Exchange: '',
    Name: '',
    Type: '',
    Country: '',
    Currency: '',
    ISIN: undefined,
    previousClose: 0,
    previousCloseDate: '',
  },
  portfolio: '',
  date: new Date(),
  quantity: '',
  price: '',
  comission: '',
  comission_type: '%',
  transaction_cost: '',
} satisfies InvestFundsFormValues;

export type InvestFundsFormValues = {
  instrumentType: Instrument;
  instrument: SearchInstrument;
  portfolio: string;
  date: Date;
  quantity: string;
  price: string;
  comission: string;
  comission_type: '%' | 'amount';
  transaction_cost: string;
};

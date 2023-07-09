import { SearchInstrument } from '__generated__/graphql';
import { InstrumentTypes } from 'constants/instruments';

export const defaultValues = {
  instrumentType: undefined,
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
  quantity: undefined,
  price: '',
  comission: '',
  comission_type: '%',
  transaction_cost: '',
} satisfies InvestFundsFormValues;

export type InvestFundsFormValues = {
  instrumentType: InstrumentTypes | undefined;
  instrument: SearchInstrument;
  portfolio: string;
  date: Date;
  quantity: number | undefined;
  price: string;
  comission: string | number;
  comission_type: '%' | 'amount';
  transaction_cost: string;
};

import { InstrumentType, SearchInstrument } from '__generated__/graphql';
import instruments from 'constants/selectors/instruments';

export const defaultValues = {
  instrumentType: instruments[0].value,
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
  instrumentType: InstrumentType;
  instrument: SearchInstrument;
  portfolio: string;
  date: Date;
  quantity: string;
  price: string;
  comission: string;
  comission_type: '%' | 'amount';
  transaction_cost: string;
};

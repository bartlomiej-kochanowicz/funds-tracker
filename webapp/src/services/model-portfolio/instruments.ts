import { client } from 'common/config/client';
import { retryHTTP } from 'utils/retryHTTP';

export type InstrumentType =
  | 'cash'
  | 'saving-accounts'
  | 'deposits'
  | 'stocks'
  | 'bonds'
  | 'commodies'
  | 'crypto'
  | 'others';

export type Instrument = {
  uuid: string;
  name: string;
  type: InstrumentType;
  percentage: number;
  rebalancing: boolean;
};

export interface InstrumentsResponse {
  collection: Instrument[];
}

export const getModelPortfolioInstruments = retryHTTP(
  () => client.get<InstrumentsResponse>('/model-portfolio'),
  {
    maxAttempts: 3,
  },
);

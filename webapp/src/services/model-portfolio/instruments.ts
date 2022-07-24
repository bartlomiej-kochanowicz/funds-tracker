import { client } from 'config/client';
import { retryHTTP } from 'utils/retryHTTP';

export type Instrument = {
  uuid: string;
  name: string;
  type: string;
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

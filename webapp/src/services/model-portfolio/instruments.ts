import { client } from 'config/client';

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

export const getModelPortfolioInstruments = () =>
  client.get<InstrumentsResponse>('/model-portfolio');

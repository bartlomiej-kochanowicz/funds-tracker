export type Instrument = {
  exchange: string;
  shortname: string;
  quoteType: string;
  symbol: string;
  index: string;
  score: number;
  typeDisp: string;
  exchDisp: string;
  isYahooFinance: boolean;
};

export type InstrumentCollection = {
  collection: Instrument[];
};

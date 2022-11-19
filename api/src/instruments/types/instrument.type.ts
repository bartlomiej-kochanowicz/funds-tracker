export type SearchInstrument = {
  quoteType: string;
  symbol: string;
  score: number;
  longname: string;
  exchange: string;
};

export type SearchInstrumentCollection = {
  collection: SearchInstrument[];
};

export type Instrument = {
  language: string;
  region: string;
  currency: string;
  exchangeTimezoneName: string;
  longName: string;
  symbol: string;
  quoteType: string;
};

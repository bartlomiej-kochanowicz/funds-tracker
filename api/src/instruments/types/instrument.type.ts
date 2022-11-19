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
  regularMarketPrice: number;
  regularMarketDayRange: string;
  exchange: string;
  fiftyTwoWeekRange: string;
  ytdReturn: number;
  quoteSourceName: string;
  regularMarketPreviousClose: number;
};

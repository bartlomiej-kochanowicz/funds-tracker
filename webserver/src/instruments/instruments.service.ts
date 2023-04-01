import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { InstrumentDetailsInput, InstrumentHistoryInput, SearchInstrumentsInput } from './inputs';
import { InstrumentDetails, InstrumentHistory, SearchInstruments } from './entities';

@Injectable()
export class InstrumentsService {
  constructor(private readonly httpService: HttpService) {}

  async search(searchInstrumentsInput: SearchInstrumentsInput): Promise<SearchInstruments[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://query2.finance.yahoo.com/v1/finance/search', {
          params: {
            q: searchInstrumentsInput.name,
          },
        })
        .pipe(
          catchError(err => {
            throw Error(err);
          }),
        ),
    );

    const collection = data.quotes.map(({ quoteType, symbol, longname, exchange }) => ({
      quoteType: quoteType || '',
      symbol: symbol || '',
      longname: longname || '',
      exchange: exchange || '',
    })) as SearchInstruments[];

    return collection;
  }

  async findOne(instrumentInput: InstrumentDetailsInput): Promise<InstrumentDetails> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://query2.finance.yahoo.com/v7/finance/quote', {
          params: {
            symbols: instrumentInput.symbol,
          },
        })
        .pipe(
          catchError(err => {
            throw Error(err);
          }),
        ),
    );

    const {
      currency,
      exchange,
      exchangeTimezoneName,
      fiftyTwoWeekRange,
      language,
      longName,
      quoteSourceName,
      quoteType,
      region,
      regularMarketDayRange,
      regularMarketPreviousClose,
      regularMarketPrice,
      symbol,
      ytdReturn,
    } = data.quoteResponse.result[0];

    return {
      currency: currency || '',
      exchange: exchange || '',
      exchangeTimezoneName: exchangeTimezoneName || '',
      fiftyTwoWeekRange: fiftyTwoWeekRange || '',
      language: language || '',
      longName: longName || '',
      quoteSourceName: quoteSourceName || '',
      quoteType: quoteType || '',
      region: region || '',
      regularMarketDayRange: regularMarketDayRange || '',
      regularMarketPreviousClose: regularMarketPreviousClose || 0,
      regularMarketPrice: regularMarketPrice || 0,
      symbol: symbol || '',
      ytdReturn: ytdReturn || 0,
    };
  }

  async findHistoryOne(instrumentHistoryInput: InstrumentHistoryInput): Promise<InstrumentHistory> {
    const { symbol, from, interval } = instrumentHistoryInput;

    const period1 = Math.round(new Date(from).getTime() / 1000);
    const period2 = Math.round(new Date().getTime() / 1000);

    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://query2.finance.yahoo.com/v7/finance/download/${symbol}`, {
          responseType: 'blob',
          params: {
            events: 'history',
            includeAdjustedClose: true,
            interval,
            period1,
            period2,
          },
        })
        .pipe(
          catchError(err => {
            throw Error(err);
          }),
        ),
    );

    return this.csvJSON(data).map(({ Date, Open, Close, High, Low }) => ({
      date: Date || '',
      open: this.parseNumber(Open) || 0,
      close: this.parseNumber(Close) || 0,
      high: this.parseNumber(High) || 0,
      low: this.parseNumber(Low) || 0,
    })) as unknown as InstrumentHistory;
  }

  csvJSON(csvStr: string): {
    Date: string;
    Open: string;
    Close: string;
    High: string;
    Low: string;
    Volume: string;
  }[] {
    const lines = csvStr.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    return result;
  }

  parseNumber(str: string): number {
    return Number(Number(str).toFixed(2));
  }
}

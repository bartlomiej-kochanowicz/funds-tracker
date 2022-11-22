import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {
  Instrument,
  InstrumentHistory,
  SearchInstrumentCollection,
} from './types/instrument.type';

@Injectable()
export class InstrumentsService {
  constructor(private readonly httpService: HttpService) {}

  async search(q): Promise<SearchInstrumentCollection> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://query2.finance.yahoo.com/v1/finance/search', {
          params: {
            q,
          },
        })
        .pipe(
          catchError((err) => {
            throw Error(err);
          }),
        ),
    );

    const collection = data.quotes.map(
      ({ quoteType, symbol, score, longname, exchange }) => ({
        quoteType,
        symbol,
        score,
        longname,
        exchange,
      }),
    );

    return {
      collection,
    };
  }

  async findOne(paramSymbol: string): Promise<Instrument> {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://query2.finance.yahoo.com/v7/finance/quote', {
          params: {
            symbols: paramSymbol,
          },
        })
        .pipe(
          catchError((err) => {
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
    };
  }

  async findHistoryOne(
    paramSymbol: string,
    interval: '1d' | '1wk' | '1mo',
    from: `${string}-${string}-${string}`,
  ): Promise<InstrumentHistory> {
    const period1 = Math.round(new Date(from).getTime() / 1000);
    const period2 = Math.round(new Date().getTime() / 1000);

    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://query2.finance.yahoo.com/v7/finance/download/${paramSymbol}`,
          {
            responseType: 'blob',
            params: {
              events: 'history',
              includeAdjustedClose: true,
              interval,
              period1,
              period2,
            },
          },
        )
        .pipe(
          catchError((err) => {
            throw Error(err);
          }),
        ),
    );

    return {
      symbol: paramSymbol,
      collection: this.csvJSON(data).map(
        ({ Date, Open, Close, High, Low }) => ({
          date: Date,
          open: this.parseNumber(Open),
          close: this.parseNumber(Close),
          high: this.parseNumber(High),
          low: this.parseNumber(Low),
        }),
      ),
    };
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

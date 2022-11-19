import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {
  Instrument,
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
}

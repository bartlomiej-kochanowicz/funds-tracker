import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { InstrumentHistoryInput, SearchInstrumentsInput } from './inputs';
import { InstrumentHistory, SearchInstruments } from './entities';

@Injectable()
export class InstrumentsService {
  constructor(private readonly httpService: HttpService, private config: ConfigService) {}

  async search(searchInstrumentsInput: SearchInstrumentsInput): Promise<SearchInstruments[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://eodhistoricaldata.com/api/search/${searchInstrumentsInput.name}`, {
          params: {
            api_token: this.config.get('EODHD_API_KEY'),
            fmt: 'json',
          },
        })
        .pipe(
          catchError(err => {
            throw Error(err);
          }),
        ),
    );

    return data;
  }

  async findHistory(instrumentHistoryInput: InstrumentHistoryInput): Promise<InstrumentHistory[]> {
    const { code, exchange, from, to = new Date(), period = '1d' } = instrumentHistoryInput;

    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://eodhistoricaldata.com/api/eod/${code}.${exchange}`, {
          params: {
            api_token: this.config.get('EODHD_API_KEY'),
            fmt: 'json',
            period,
            from: new Date(from).toISOString().split('T')[0],
            to: new Date(to).toISOString().split('T')[0],
          },
        })
        .pipe(
          catchError(err => {
            throw Error(err);
          }),
        ),
    );

    return data;
  }
}

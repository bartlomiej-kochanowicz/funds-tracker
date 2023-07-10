import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Instrument } from '@app/common/constants/instrument';
import { InstrumentHistoryInput, SearchInstrumentInput } from './inputs';
import { InstrumentHistory, SearchInstrument } from './entities';

@Injectable()
export class InstrumentsService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async search(searchInstrumentInput: SearchInstrumentInput): Promise<SearchInstrument[]> {
    const type = this.getType(searchInstrumentInput.type);

    const { data } = await firstValueFrom(
      this.httpService
        .get(`https://eodhistoricaldata.com/api/search/${searchInstrumentInput.name}`, {
          params: {
            api_token: this.config.get('EODHD_API_KEY'),
            type,
            bonds_only: type === 'bond' ? 1 : 0,
            fmt: 'json',
          },
        })
        .pipe(
          catchError(() => {
            throw Error('Error fetching instruments');
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
          catchError(() => {
            throw Error('Error fetching instrument history');
          }),
        ),
    );

    return data;
  }

  // async buyInstrument(instrumentHistoryInput: InstrumentHistoryInput): Promise<void> {}

  private getType(type: SearchInstrumentInput['type']): string {
    switch (type) {
      case Instrument.stocks:
        return 'stock';
      case Instrument.bonds:
        return 'bond';
      case Instrument.etfs:
        return 'etf';
      case Instrument.crypto:
        return 'crypto';
      default:
        return 'all';
    }
  }
}

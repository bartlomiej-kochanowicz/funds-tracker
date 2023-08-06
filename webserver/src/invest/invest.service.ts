import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, of } from 'rxjs';
import { InvestInNewInstrumentInput } from './inputs/investInNewInstrument.input';

@Injectable()
export class InvestService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async investInNewInstrumentInput(data: InvestInNewInstrumentInput) {
    const { instrument } = data;

    const { code, exchange } = instrument;

    console.log(await this.checkIfInstrumentExists(code, exchange));

    return {
      success: true,
    };
  }

  private async checkIfInstrumentExists(code: string, exchange: string) {
    const data = await firstValueFrom(
      this.httpService
        .get(`https://eodhistoricaldata.com/api/eod/${code}.${exchange}`, {
          params: {
            api_token: this.config.get('EODHD_API_KEY'),
            fmt: 'json',
            period: '1d',
            from: new Date().toISOString().split('T')[0],
            to: new Date().toISOString().split('T')[0],
          },
        })
        .pipe(
          catchError(() => {
            return of(false);
          }),
        ),
    );

    return Boolean(data);
  }
}

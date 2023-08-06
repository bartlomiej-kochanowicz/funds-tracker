import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, of } from 'rxjs';
import { PrismaService } from '@app/prisma/prisma.service';
import { Instrument } from '@app/common/inputs/Instrument.input';
import { EodHistoricalDataSearchResponse } from '@app/common/types/eodhistoricaldata-search';
import { InvestInNewInstrumentInput } from './inputs/investInNewInstrument.input';

@Injectable()
export class InvestService {
  constructor(
    private readonly httpService: HttpService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  async investInNewInstrumentInput(data: InvestInNewInstrumentInput) {
    const { instrument } = data;

    const { code, exchange } = instrument;

    const instrumentExists = await this.checkIfInstrumentExists(code, exchange);

    if (!instrumentExists) {
      throw new Error('Instrument does not exist');
    }

    const isInstrumentAlreadyAdded = await this.prisma.instrument.findFirst({
      where: {
        codeExchange: this.generateInstrumentCodeExchange(code, exchange),
      },
    });

    if (!isInstrumentAlreadyAdded) {
      const { codeExchange } = await this.addInstrumentToDatabase(instrument);

      await this.addOperationToPortfolio(data, codeExchange);

      return {
        success: true,
      };
    }

    const { codeExchange } = isInstrumentAlreadyAdded;

    await this.addOperationToPortfolio(data, codeExchange);

    // add operation to cash account

    return {
      success: true,
    };
  }

  private async addOperationToPortfolio(data: InvestInNewInstrumentInput, codeExchange: string) {
    await this.prisma.portfolioOperation.create({
      data: {
        portfolio: {
          connect: {
            uuid: data.portfolioUuid,
          },
        },
        instrument: {
          connect: {
            codeExchange,
          },
        },
        price: data.price,
        quantity: data.quantity,
        date: new Date(data.date),
        type: 'buy',
      },
    });
  }

  private generateInstrumentCodeExchange(code: string, exchange: string) {
    return `${code.toUpperCase()}.${exchange.toUpperCase()}`;
  }

  private async addInstrumentToDatabase(instrument: Instrument) {
    const { code, exchange, ISIN, ...restInstrument } = instrument;

    return await this.prisma.instrument.create({
      data: {
        codeExchange: this.generateInstrumentCodeExchange(code, exchange),
        code: code.toUpperCase(),
        exchange: exchange.toUpperCase(),
        ISIN: ISIN || (await this.getInstrumentISIN(code, exchange)),
        ...restInstrument,
      },
    });
  }

  private async getInstrumentISIN(code: string, exchange: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<EodHistoricalDataSearchResponse>(
          `https://eodhistoricaldata.com/api/search/${code}.${exchange}`,
          {
            params: {
              api_token: this.config.get('EODHD_API_KEY'),
              fmt: 'json',
            },
          },
        )
        .pipe(
          catchError(() => {
            return of(null);
          }),
        ),
    );

    const [CODE, EXCHANGE] = [code.toUpperCase(), exchange.toUpperCase()];

    const instrument = data.find(({ Code, Exchange }) => Code === CODE && Exchange === EXCHANGE);

    return instrument?.ISIN || null;
  }

  private async checkIfInstrumentExists(code: string, exchange: string) {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `https://eodhistoricaldata.com/api/eod/${code.toUpperCase()}.${exchange.toUpperCase()}`,
          {
            params: {
              api_token: this.config.get('EODHD_API_KEY'),
              fmt: 'json',
              period: '1d',
              from: new Date().toISOString().split('T')[0],
              to: new Date().toISOString().split('T')[0],
            },
          },
        )
        .pipe(
          catchError(() => {
            return of(false);
          }),
        ),
    );

    return Boolean(data);
  }
}

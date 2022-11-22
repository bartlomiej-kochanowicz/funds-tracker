import { Controller, Get, Param, Query } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import {
  Instrument,
  InstrumentHistory,
  SearchInstrumentCollection,
} from './types/instrument.type';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Get('search')
  search(@Query('q') q: string = ''): Promise<SearchInstrumentCollection> {
    return this.instrumentsService.search(q);
  }

  @Get(':symbol')
  findOne(@Param('symbol') symbol: string): Promise<Instrument> {
    return this.instrumentsService.findOne(symbol);
  }

  @Get('/history/:symbol')
  findHistoryOne(
    @Param('symbol') symbol: string,
    @Query('from') from: `${string}-${string}-${string}`,
    @Query('interval') interval: '1d' | '1wk' | '1mo' = '1d',
  ): Promise<InstrumentHistory> {
    return this.instrumentsService.findHistoryOne(symbol, interval, from);
  }
}

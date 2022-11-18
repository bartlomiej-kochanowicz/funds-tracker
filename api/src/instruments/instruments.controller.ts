import { Controller, Get, Param, Query } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';
import {
  Instrument,
  SearchInstrumentCollection,
} from './types/instrument.type';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Get('/search')
  search(@Query('q') q: string = ''): Promise<SearchInstrumentCollection> {
    return this.instrumentsService.search(q);
  }

  @Get(':symbol')
  findOne(@Param('symbol') symbol: string): Promise<Instrument> {
    return this.instrumentsService.findOne(symbol);
  }
}

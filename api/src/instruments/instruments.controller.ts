import { Controller, Get, Param, Query } from '@nestjs/common';
import { InstrumentsService } from './instruments.service';

@Controller('instruments')
export class InstrumentsController {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Get('/search')
  search(@Query('q') q: string = '') {
    return this.instrumentsService.search(q);
  }

  @Get(':symbol')
  findOne(@Param('symbol') symbol: string) {
    return this.instrumentsService.findOne(symbol);
  }
}

import { Args, Query, Resolver } from '@nestjs/graphql';
import { InstrumentHistory, SearchInstrument } from './entities';
import { InstrumentHistoryInput, SearchInstrumentInput } from './inputs';
import { InstrumentsService } from './instruments.service';

@Resolver()
export class InstrumentsResolver {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Query(() => [SearchInstrument])
  searchInstrument(
    @Args('data')
    searchInstrumentInput: SearchInstrumentInput,
  ) {
    return this.instrumentsService.search(searchInstrumentInput);
  }

  @Query(() => [InstrumentHistory])
  instrumentHistory(
    @Args('data')
    instrumentHistoryInput: InstrumentHistoryInput,
  ) {
    return this.instrumentsService.findHistory(instrumentHistoryInput);
  }
}

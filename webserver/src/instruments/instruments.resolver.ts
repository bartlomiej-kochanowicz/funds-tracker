import { Args, Query, Resolver } from '@nestjs/graphql';
import { InstrumentHistory, SearchInstruments } from './entities';
import { InstrumentHistoryInput, SearchInstrumentsInput } from './inputs';
import { InstrumentsService } from './instruments.service';

@Resolver()
export class InstrumentsResolver {
  constructor(private readonly instrumentsService: InstrumentsService) {}

  @Query(() => [SearchInstruments])
  searchInstruments(
    @Args('data')
    searchInstrumentsInput: SearchInstrumentsInput,
  ) {
    return this.instrumentsService.search(searchInstrumentsInput);
  }

  @Query(() => [InstrumentHistory])
  instrumentHistory(
    @Args('data')
    instrumentHistoryInput: InstrumentHistoryInput,
  ) {
    return this.instrumentsService.findHistory(instrumentHistoryInput);
  }
}

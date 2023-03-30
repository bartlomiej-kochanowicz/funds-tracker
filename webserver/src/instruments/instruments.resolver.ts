import { Args, Query, Resolver } from '@nestjs/graphql';
import { InstrumentDetails, InstrumentHistory, SearchInstruments } from './entities';
import { InstrumentDetailsInput, InstrumentHistoryInput, SearchInstrumentsInput } from './inputs';
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

  @Query(() => InstrumentDetails)
  instrumentDetails(
    @Args('data')
    instrumentInput: InstrumentDetailsInput,
  ) {
    return this.instrumentsService.findOne(instrumentInput);
  }

  @Query(() => [InstrumentHistory])
  instrumentHistory(
    @Args('data')
    instrumentInput: InstrumentHistoryInput,
  ) {
    return this.instrumentsService.findHistoryOne(instrumentInput);
  }
}

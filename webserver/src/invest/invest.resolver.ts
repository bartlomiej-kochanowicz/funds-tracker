import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InvestService } from './invest.service';
import { InvestInNewInstrument } from './entities/investInNewInstrument.entity';
import { InvestInNewInstrumentInput } from './inputs/investInNewInstrument.input';

@Resolver()
export class InvestResolver {
  constructor(private readonly investService: InvestService) {}

  @Mutation(() => InvestInNewInstrument)
  investInNewInstrument(@Args('data') data: InvestInNewInstrumentInput) {
    return this.investService.investInNewInstrumentInput(data);
  }
}

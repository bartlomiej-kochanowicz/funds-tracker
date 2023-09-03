import { Resolver } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';

@Resolver()
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}
}

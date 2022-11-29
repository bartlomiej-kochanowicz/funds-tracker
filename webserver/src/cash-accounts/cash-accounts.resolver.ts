import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from 'common/decorators';
import { CashAccountsService } from './cash-accounts.service';
import { CashAccount } from './entities';
import { CreateCashAccountInput, UpdateCashAccountInput } from './inputs';

@Resolver(() => CashAccount)
export class CashAccountsResolver {
  constructor(private readonly cashAccountsService: CashAccountsService) {}

  @Mutation(() => CashAccount)
  createCashAccount(
    @GetCurrentUserId() userId: string,
    @Args('data')
    createCashAccountInput: CreateCashAccountInput,
  ) {
    return this.cashAccountsService.create(userId, createCashAccountInput);
  }

  @Query(() => [CashAccount])
  cashAccounts(@GetCurrentUserId() userId: string) {
    return this.cashAccountsService.findAll(userId);
  }

  @Query(() => CashAccount)
  cashAccount(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
  ) {
    return this.cashAccountsService.findOne(userId, uuid);
  }

  @Mutation(() => CashAccount)
  updateCashAccount(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('data')
    updateCashAccountInput: UpdateCashAccountInput,
  ) {
    return this.cashAccountsService.update(userId, uuid, updateCashAccountInput);
  }

  @Mutation(() => CashAccount)
  deleteCashAccount(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
  ) {
    return this.cashAccountsService.delete(userId, uuid);
  }
}

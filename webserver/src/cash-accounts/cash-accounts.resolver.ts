import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from 'common/decorators';
import { CashAccountsService } from './cash-accounts.service';
import { CashAccount, CashAccountHistory, CashAccounts } from './entities';
import { CreateCashAccountInput, CreateCashAccountsInput, UpdateCashAccountInput } from './inputs';

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

  @Mutation(() => CashAccounts)
  createCashAccounts(
    @GetCurrentUserId() userId: string,
    @Args('data')
    createCashAccountsInput: CreateCashAccountsInput,
  ) {
    return this.cashAccountsService.createMany(userId, createCashAccountsInput);
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

  @ResolveField(() => [CashAccountHistory])
  history(
    @Parent() cashAccount: CashAccount,
    @Args('first', { type: () => Number, nullable: true })
    first?: number,
  ) {
    const { uuid } = cashAccount;

    return this.cashAccountsService.findHistory(uuid, first);
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
    @Args('uuid', { type: () => ID }) uuid: string,
  ) {
    return this.cashAccountsService.delete(userId, uuid);
  }
}

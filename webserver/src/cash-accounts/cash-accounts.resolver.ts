import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from '@common/decorators';
import { CashAccountsService } from './cash-accounts.service';
import {
  CashAccount,
  CashAccountDelete,
  CashAccountOperation,
  IntroductionCashAccounts,
} from './entities';
import {
  AddFundsToCashAccountInput,
  CreateCashAccountInput,
  IntroductionCreateCashAccountsInput,
  UpdateCashAccountInput,
} from './inputs';

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

  @Mutation(() => IntroductionCashAccounts)
  introductionCreateCashAccounts(
    @GetCurrentUserId() userId: string,
    @Args('data')
    introductionCreateCashAccountInput: IntroductionCreateCashAccountsInput,
  ) {
    return this.cashAccountsService.introductionCreateCashAccounts(
      userId,
      introductionCreateCashAccountInput,
    );
  }

  @Query(() => [CashAccount])
  cashAccounts(@GetCurrentUserId() userId: string) {
    return this.cashAccountsService.findAll(userId);
  }

  @Query(() => CashAccount)
  cashAccount(@GetCurrentUserId() userId: string, @Args('uuid', { type: () => ID }) uuid: string) {
    return this.cashAccountsService.findOne(userId, uuid);
  }

  @ResolveField(() => [CashAccountOperation])
  operations(
    @Parent() cashAccount: CashAccount,
    @Args('first', { type: () => Number, nullable: true })
    first?: number,
    @Args('skip', { type: () => Number, nullable: true })
    skip?: number,
  ) {
    const { uuid } = cashAccount;

    return this.cashAccountsService.findOperations(uuid, first, skip);
  }

  @Mutation(() => CashAccount)
  updateCashAccount(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => ID }) uuid: string,
    @Args('data')
    updateCashAccountInput: UpdateCashAccountInput,
  ) {
    return this.cashAccountsService.update(userId, uuid, updateCashAccountInput);
  }

  @Mutation(() => CashAccountDelete)
  deleteCashAccount(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => ID }) uuid: string,
  ): Promise<CashAccountDelete> {
    return this.cashAccountsService.delete(userId, uuid);
  }

  @Mutation(() => CashAccount)
  addFundsToCashAccount(
    @GetCurrentUserId() userId: string,
    @Args('data')
    addFundsToCashAccountInput: AddFundsToCashAccountInput,
  ) {
    return this.cashAccountsService.addFundsToCashAccountInput(userId, addFundsToCashAccountInput);
  }
}

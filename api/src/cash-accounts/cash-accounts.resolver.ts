import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from 'common/decorators';
import { CashAccountsService } from './cash-accounts.service';
import { CashAccount } from './entities/cash-account.entity';
import { CreateCashAccountInput } from './inputs/create-cash-account.input';

@Resolver(() => CashAccount)
export class CashAccountsResolver {
  constructor(private readonly cashAccountsService: CashAccountsService) {}

  @Mutation('createCashAccount')
  create(
    @GetCurrentUserId() userId: string,
    @Args('createCashAccountInput')
    createCashAccountInput: CreateCashAccountInput,
  ) {
    return this.cashAccountsService.create(userId, createCashAccountInput);
  }

  @Query(() => [CashAccount])
  findAll(@GetCurrentUserId() userId: string) {
    return this.cashAccountsService.findAll(userId);
  }

  /*

  @Get(':uuid')
  findOne(@GetCurrentUserId() userId: string, @Param('uuid') uuid: string) {
    return this.cashAccountsService.findOne(userId, uuid);
  }

  @Patch(':uuid')
  update(
    @GetCurrentUserId() userId: string,
    @Param('uuid') uuid: string,
    @Body() updateCashAccountDto: UpdateCashAccountInput,
  ) {
    return this.cashAccountsService.update(userId, uuid, updateCashAccountDto);
  }

  @Delete(':uuid')
  remove(@GetCurrentUserId() userId: string, @Param('uuid') uuid: string) {
    return this.cashAccountsService.remove(userId, uuid);
  } */
}

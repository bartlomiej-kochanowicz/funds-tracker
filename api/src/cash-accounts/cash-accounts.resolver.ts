import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from 'common/decorators';
import { CashAccountsService } from './cash-accounts.service';
import { CashAccount } from './entities/cash-account.entity';
import { CreateCashAccountInput } from './inputs/create-cash-account.input';

@Resolver(() => CashAccount)
export class CashAccountsResolver {
  constructor(private readonly cashAccountsService: CashAccountsService) {}

  @Mutation(() => CashAccount)
  async create(
    @GetCurrentUserId() userId: string,
    @Args('createCashAccountInput')
    createCashAccountInput: CreateCashAccountInput,
  ) {
    return await this.cashAccountsService.create(
      userId,
      createCashAccountInput,
    );
  }

  @Query(() => [CashAccount])
  async findAll(@GetCurrentUserId() userId: string) {
    return await this.cashAccountsService.findAll(userId);
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

import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { GetCurrentUserId } from "@decorators/get-current-user-id.decorator";
import { CashAccountsService } from "./cash-accounts.service";
import {
	CashAccount,
	CashAccountDelete,
	CashAccountOperation,
	IntroductionCashAccounts,
} from "./entities";
import {
	CashAccountAddFundsInput,
	CashAccountCreateInput,
	IntroductionCashAccountCreatesInput,
	CashAccountUpdateInput,
} from "./inputs";

@Resolver(() => CashAccount)
export class CashAccountsResolver {
	constructor(private readonly cashAccountsService: CashAccountsService) {}

	@Mutation(() => CashAccount)
	cashAccountCreate(
		@GetCurrentUserId() userId: string,
		@Args("data")
		cashAccountCreateInput: CashAccountCreateInput,
	) {
		return this.cashAccountsService.create(userId, cashAccountCreateInput);
	}

	@Mutation(() => IntroductionCashAccounts)
	introductionCashAccountCreates(
		@GetCurrentUserId() userId: string,
		@Args("data")
		introductionCashAccountCreateInput: IntroductionCashAccountCreatesInput,
	) {
		return this.cashAccountsService.introductionCashAccountCreates(
			userId,
			introductionCashAccountCreateInput,
		);
	}

	@Query(() => [CashAccount])
	cashAccounts(@GetCurrentUserId() userId: string) {
		return this.cashAccountsService.findAll(userId);
	}

	@Query(() => CashAccount)
	cashAccount(@GetCurrentUserId() userId: string, @Args("uuid", { type: () => ID }) uuid: string) {
		return this.cashAccountsService.findOne(userId, uuid);
	}

	@ResolveField(() => [CashAccountOperation])
	operations(
		@Parent() cashAccount: CashAccount,
		@Args("first", { type: () => Number, nullable: true })
		first?: number,
		@Args("skip", { type: () => Number, nullable: true })
		skip?: number,
	) {
		const { uuid } = cashAccount;

		return this.cashAccountsService.findOperations(uuid, first, skip);
	}

	@Mutation(() => CashAccount)
	cashAccountUpdate(
		@GetCurrentUserId() userId: string,
		@Args("uuid", { type: () => ID }) uuid: string,
		@Args("data")
		cashAccountUpdateInput: CashAccountUpdateInput,
	) {
		return this.cashAccountsService.update(userId, uuid, cashAccountUpdateInput);
	}

	@Mutation(() => CashAccountDelete)
	cashAccountDelete(
		@GetCurrentUserId() userId: string,
		@Args("uuid", { type: () => ID }) uuid: string,
	): Promise<CashAccountDelete> {
		return this.cashAccountsService.delete(userId, uuid);
	}

	@Mutation(() => CashAccount)
	cashAccountAddFunds(
		@GetCurrentUserId() userId: string,
		@Args("data")
		cashAccountAddFundsInput: CashAccountAddFundsInput,
	) {
		return this.cashAccountsService.cashAccountAddFundsInput(userId, cashAccountAddFundsInput);
	}
}

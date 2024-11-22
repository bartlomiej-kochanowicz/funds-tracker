import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
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
		// @GetCurrentUserId() userId: string,
		@Args("data")
		cashAccountCreateInput: CashAccountCreateInput,
	) {
		return this.cashAccountsService.create("", cashAccountCreateInput);
	}

	@Mutation(() => IntroductionCashAccounts)
	introductionCashAccountCreates(
		// @GetCurrentUserId() userId: string,
		@Args("data")
		introductionCashAccountCreateInput: IntroductionCashAccountCreatesInput,
	) {
		return this.cashAccountsService.introductionCashAccountCreates(
			"",
			introductionCashAccountCreateInput,
		);
	}

	@Query(() => [CashAccount])
	cashAccounts(/* @GetCurrentUserId() userId: string */) {
		return this.cashAccountsService.findAll("");
	}

	@Query(() => CashAccount)
	cashAccount(
		/* @GetCurrentUserId() userId: string, */ @Args("uuid", { type: () => ID }) uuid: string,
	) {
		return this.cashAccountsService.findOne("", uuid);
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
		/* @GetCurrentUserId() userId: string, */
		@Args("uuid", { type: () => ID }) uuid: string,
		@Args("data")
		cashAccountUpdateInput: CashAccountUpdateInput,
	) {
		return this.cashAccountsService.update("", uuid, cashAccountUpdateInput);
	}

	@Mutation(() => CashAccountDelete)
	cashAccountDelete(
		/* @GetCurrentUserId() userId: string, */
		@Args("uuid", { type: () => ID }) uuid: string,
	): Promise<CashAccountDelete> {
		return this.cashAccountsService.delete("", uuid);
	}

	@Mutation(() => CashAccount)
	cashAccountAddFunds(
		/* @GetCurrentUserId() userId: string, */
		@Args("data")
		cashAccountAddFundsInput: CashAccountAddFundsInput,
	) {
		return this.cashAccountsService.cashAccountAddFundsInput("", cashAccountAddFundsInput);
	}
}

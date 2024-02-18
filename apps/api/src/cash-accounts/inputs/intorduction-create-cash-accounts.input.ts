import { Field, InputType } from "@nestjs/graphql";
import { ArrayNotEmpty, IsArray } from "class-validator";
import { CashAccountCreateInput } from "./cash-account-create.input";

@InputType()
export class IntroductionCashAccountCreatesInput {
	@IsArray({ message: "Cash accounts must be an array." })
	@ArrayNotEmpty({ message: "Cash accounts array must not be empty." })
	@Field(() => [CashAccountCreateInput], { description: "Cash accounts array." })
	cashAccounts: CashAccountCreateInput[];
}

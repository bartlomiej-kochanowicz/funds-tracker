import { Field, InputType } from "@nestjs/graphql";
import { ArrayNotEmpty, IsArray } from "class-validator";
import { CreateCashAccountInput } from "./create-cash-account.input";

@InputType()
export class IntroductionCreateCashAccountsInput {
	@IsArray({ message: "Cash accounts must be an array." })
	@ArrayNotEmpty({ message: "Cash accounts array must not be empty." })
	@Field(() => [CreateCashAccountInput], { description: "Cash accounts array." })
	cashAccounts: CreateCashAccountInput[];
}

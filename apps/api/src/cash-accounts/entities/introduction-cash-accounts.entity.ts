import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class IntroductionCashAccounts {
	@Field(() => Boolean, { description: "Cash accounts created successfully." })
	success: boolean;
}

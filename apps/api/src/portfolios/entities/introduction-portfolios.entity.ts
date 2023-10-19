import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class IntroductionPortfolios {
	@Field(() => Boolean, { description: "Portfolios created successfully." })
	success: boolean;
}

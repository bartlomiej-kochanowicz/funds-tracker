import { ObjectType, Field, registerEnumType, ID } from "@nestjs/graphql";
import { Currency, IntroductionStep } from "@prisma/client";
import { DateResolver, EmailAddressResolver } from "graphql-scalars";

@ObjectType()
export class User {
	@Field(() => ID, { description: "User uuid." })
	uuid: string;

	@Field(() => DateResolver, { description: "User date created." })
	createdAt: Date;

	@Field(() => EmailAddressResolver, { description: "User email." })
	email: string;

	@Field(() => String, { description: "User name." })
	name: string;

	@Field(() => IntroductionStep, { description: "User introduction step." })
	introductionStep: IntroductionStep;

	@Field(() => Currency, { description: "User default currency." })
	defaultCurrency: Currency;
}

registerEnumType(IntroductionStep, {
	name: "IntroductionStep",
});

registerEnumType(Currency, {
	name: "Currency",
});

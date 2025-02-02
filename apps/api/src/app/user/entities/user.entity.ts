import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { Subscription } from "@prisma/client";
import { DateResolver, EmailAddressResolver } from "graphql-scalars";

@ObjectType()
export class User {
	@Field(() => ID)
	uuid: string;

	@Field(() => DateResolver)
	createdAt: Date;

	@Field(() => EmailAddressResolver)
	email: string;

	@Field(() => String)
	name: string;

	@Field(() => Subscription)
	subscription: Subscription;
}

registerEnumType(Subscription, {
	name: "Subscription",
	description: "The subscription status of the user",
});

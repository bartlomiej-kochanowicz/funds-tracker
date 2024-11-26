import { ObjectType, Field, ID } from "@nestjs/graphql";
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
}

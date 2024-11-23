import { ObjectType, Field, ID } from "@nestjs/graphql";
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
}

import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Wallet {
	@Field(() => ID)
	uuid: string;

	@Field(() => String)
	name: string;
}

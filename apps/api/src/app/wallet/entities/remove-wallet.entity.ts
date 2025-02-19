import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class RemoveWallet {
	@Field(() => Boolean)
	success: boolean;
}

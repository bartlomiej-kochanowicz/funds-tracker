import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class TransactionCreate {
	@Field(() => Boolean, { description: "Success" })
	success: boolean;
}

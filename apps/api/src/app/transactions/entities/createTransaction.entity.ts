import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class CreateTransaction {
	@Field(() => Boolean, { description: "Success" })
	success: boolean;
}

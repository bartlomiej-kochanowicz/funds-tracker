import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ResetPassword {
	@Field(() => Boolean)
	success: boolean;
}

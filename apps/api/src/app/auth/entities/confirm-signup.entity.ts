import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ConfirmSignUp {
	@Field(() => Boolean)
	success: boolean;
}

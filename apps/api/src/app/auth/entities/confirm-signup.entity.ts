import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ConfirmSignup {
	@Field(() => Boolean)
	success: boolean;
}

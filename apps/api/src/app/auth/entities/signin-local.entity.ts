import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SignInLocal {
	@Field(() => Boolean)
	success: boolean;
}

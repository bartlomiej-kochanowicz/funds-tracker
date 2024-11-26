import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SignupLocal {
	@Field(() => Boolean)
	success: boolean;
}

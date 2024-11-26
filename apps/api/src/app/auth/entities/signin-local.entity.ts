import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SigninLocal {
	@Field(() => Boolean)
	success: boolean;
}

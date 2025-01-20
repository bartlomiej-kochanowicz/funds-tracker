import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SignUpLocal {
	@Field(() => Boolean)
	success: boolean;
}

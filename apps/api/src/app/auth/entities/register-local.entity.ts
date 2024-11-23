import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class RegisterLocal {
	@Field(() => Boolean)
	success: boolean;
}

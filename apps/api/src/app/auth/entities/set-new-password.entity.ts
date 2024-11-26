import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SetNewPassword {
	@Field(() => Boolean)
	success: boolean;
}

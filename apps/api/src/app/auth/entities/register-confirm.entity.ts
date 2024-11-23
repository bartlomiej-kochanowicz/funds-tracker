import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class RegisterConfirm {
	@Field(() => Boolean)
	success: boolean;
}

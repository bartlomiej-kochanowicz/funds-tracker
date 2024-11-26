import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Refresh {
	@Field(() => Boolean)
	success: boolean;
}

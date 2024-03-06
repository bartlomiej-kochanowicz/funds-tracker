import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Logout {
	@Field(() => Boolean, { description: "Logout successful." })
	success: boolean;
}

import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Email {
	@Field(() => Boolean)
	exist: boolean;
}

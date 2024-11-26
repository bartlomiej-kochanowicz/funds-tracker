import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsOptional, Length } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class UpdateUserInput {
	@IsEmail()
	@IsOptional()
	@Field(() => EmailAddressResolver, { nullable: true })
	email?: string;

	@Length(4, 50, { message: "Name must be between 4 and 50 characters." })
	@IsOptional()
	@Field(() => String, { nullable: true })
	name?: string;
}

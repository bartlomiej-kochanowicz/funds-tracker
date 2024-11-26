import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class ConfirmSignupInput {
	@Field(() => EmailAddressResolver, { description: "Email." })
	@IsEmail()
	email: string;

	@Field(() => String, { description: "Code." })
	@IsString()
	code: string;

	@Field(() => String, { description: "Token." })
	@IsString()
	token: string;
}

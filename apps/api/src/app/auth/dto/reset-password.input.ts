import { InputType, Field } from "@nestjs/graphql";
import { IsEmail } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class ResetPasswordInput {
	@IsEmail()
	@Field(() => EmailAddressResolver)
	email: string;

	@Field(() => String)
	token: string;
}

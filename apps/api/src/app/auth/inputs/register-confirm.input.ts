import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class RegisterConfirmInput {
	@Field(() => EmailAddressResolver)
	@IsEmail()
	email: string;

	@Field(() => String)
	@IsString()
	code: string;

	@Field(() => String)
	@IsString()
	token: string;
}

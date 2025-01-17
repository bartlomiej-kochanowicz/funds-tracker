import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class SignUpInput {
	@IsEmail()
	@Field(() => EmailAddressResolver)
	email: string;

	@Length(3, 30, { message: "form.name.invalid" })
	@Field(() => String)
	name: string;

	@Length(12, 64, { message: "form.password.invalid" })
	@Field(() => String)
	password: string;

	@Field(() => String)
	token: string;
}

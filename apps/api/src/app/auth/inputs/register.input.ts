import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class RegisterInput {
	@IsEmail()
	@Field(() => EmailAddressResolver)
	email: string;

	@Length(4, 32, { message: "form.password.min" })
	@Field(() => String)
	name: string;

	@Length(8, 32, { message: "form.password.max" })
	@Field(() => String)
	password: string;

	@Field(() => String)
	token: string;
}

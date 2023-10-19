import { InputType, Field } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class SigninInput {
	@IsEmail()
	@Field(() => String, { description: "Email." })
	email: string;

	@Field(() => String, { description: "Password." })
	password: string;

	@Field(() => String, { description: "Token." })
	token: string;
}

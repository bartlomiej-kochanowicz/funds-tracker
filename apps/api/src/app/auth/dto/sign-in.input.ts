import { InputType, Field } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export class SignInInput {
	@IsEmail()
	@Field(() => String)
	email: string;

	@Field(() => String)
	password: string;

	@Field(() => String)
	token: string;
}

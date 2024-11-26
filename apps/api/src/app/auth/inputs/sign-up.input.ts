import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, Length } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class SignUpInput {
	@IsEmail()
	@Field(() => EmailAddressResolver)
	email: string;

	@Length(4, 50, { message: "Name must be between 4 and 50 characters." })
	@Field(() => String)
	name: string;

	@Length(8, 32, { message: "Name must be between 8 and 32 characters." })
	@Field(() => String)
	password: string;

	@Field(() => String)
	token: string;
}

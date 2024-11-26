import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class SendCodeInput {
	@IsEmail()
	@Field(() => EmailAddressResolver, { description: "Email." })
	email: string;

	@IsString()
	@Field(() => String, { description: "Token." })
	token: string;
}

import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class SendCodeInput {
	@IsEmail()
	@Field(() => EmailAddressResolver)
	email: string;

	@IsString()
	@Field(() => String)
	token: string;
}

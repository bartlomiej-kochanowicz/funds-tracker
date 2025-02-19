import { InputType, Field } from "@nestjs/graphql";
import { /* IsEmail, */ IsOptional, Length } from "class-validator";
/* import { EmailAddressResolver } from "graphql-scalars"; */

@InputType()
export class UpdateUserInput {
	/* @IsEmail()
	@IsOptional()
	@Field(() => EmailAddressResolver, { nullable: true })
	email?: string; */

	@Length(3, 30, { message: "form.name.invalid" })
	@IsOptional()
	@Field(() => String, { nullable: true })
	name?: string;
}

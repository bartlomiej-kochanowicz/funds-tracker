import { InputType, Field, registerEnumType } from "@nestjs/graphql";
import { IsEmail, IsOptional, Length } from "class-validator";
import { EmailAddressResolver } from "graphql-scalars";

@InputType()
export class UpdateUserInput {
	@IsEmail()
	@IsOptional()
	@Field(() => EmailAddressResolver, { description: "New user email.", nullable: true })
	email?: string;

	@Length(4, 50, { message: "Name must be between 4 and 50 characters." })
	@IsOptional()
	@Field(() => String, { description: "New user name.", nullable: true })
	name?: string;

	@IsOptional()
	@Field(() => String, { description: "New default currency.", nullable: true })
	defaultCurrency?: string;
}

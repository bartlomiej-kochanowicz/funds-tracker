import { InputType, Field } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";

@InputType()
export class SetNewPasswordInput {
	@Length(8, 32, { message: "Name must be between 4 and 50 characters." })
	@Field(() => String)
	password: string;

	@Field(() => String)
	@IsString()
	resetToken: string;

	@Field(() => String)
	@IsString()
	token: string;
}

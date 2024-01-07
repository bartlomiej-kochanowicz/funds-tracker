import { InputType, Field } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";

@InputType()
export class SetNewPasswordInput {
	@Length(12, 50, { message: "Name must be between 4 and 50 characters." })
	@Field(() => String, { description: "Password." }) // 12,50
	password: string;

	@Field(() => String, { description: "Reset token." })
	@IsString()
	resetToken: string;

	@Field(() => String, { description: "Token." })
	@IsString()
	token: string;
}

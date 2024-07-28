import { InputType, Field } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class CashAccountCreateInput {
	@Length(2, 50, { message: "Name must be between 2 and 50 characters." })
	@Field(() => String, { description: "Cash account name." })
	name: string;

	@Field(() => String, { description: "Cash account currency." })
	currency: string;
}

import { InputType, Field, registerEnumType } from "@nestjs/graphql";
import { Currency } from "@prisma/client";
import { IsEnum, Length } from "class-validator";

@InputType()
export class CashAccountCreateInput {
	@Length(2, 50, { message: "Name must be between 2 and 50 characters." })
	@Field(() => String, { description: "Cash account name." })
	name: string;

	@IsEnum(Currency)
	@Field(() => Currency, { description: "Cash account currency." })
	currency: Currency;
}

registerEnumType(Currency, {
	name: "Currency",
});

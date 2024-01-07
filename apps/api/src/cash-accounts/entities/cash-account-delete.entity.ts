import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class CashAccountDelete {
	@Field(() => Boolean, { description: "Confirmatiopn delete cash account." })
	success: boolean;
}

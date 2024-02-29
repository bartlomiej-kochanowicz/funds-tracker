import { ObjectType, Field, ID, Float, registerEnumType } from "@nestjs/graphql";
import {
	CashAccountOperation as ICashAccountOperation,
	CashAccountOperationType,
} from "@prisma/client";

@ObjectType()
export class CashAccountOperation
	implements Omit<ICashAccountOperation, "cashAccountUuid" | "date">
{
	@Field(() => ID, { description: "Transaction uuid." })
	uuid: string;

	@Field(() => String, { description: "Date of the transaction." })
	date: string;

	@Field(() => Float, { description: "Cash account balance." })
	amount: number;

	@Field(() => CashAccountOperationType, { description: "Cash account oparation type." })
	type: CashAccountOperationType;

	@Field(() => String, { description: "Portfolio uuid." })
	portfolioUuid: string;
}

registerEnumType(CashAccountOperationType, {
	name: "CashAccountOperationType",
});

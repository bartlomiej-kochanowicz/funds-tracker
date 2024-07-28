import { ObjectType, Field, ID, Float } from "@nestjs/graphql";
import { CashAccountOperation } from "./cash-account-operation.entity";

@ObjectType()
export class CashAccount {
	@Field(() => ID, { description: "Cash account uuid." })
	uuid: string;

	@Field(() => String, { description: "Cash account name." }) // 2,50
	name: string;

	@Field(() => String, { description: "Cash account currency." })
	currency: string;

	@Field(() => Float, { description: "Account balance." })
	balance: number;

	@Field(() => [CashAccountOperation], { description: "Account opeartions." })
	operations: CashAccountOperation[];
}

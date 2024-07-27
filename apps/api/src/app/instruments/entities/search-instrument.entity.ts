import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SearchInstrument {
	@Field(() => String, { description: "Symbol" })
	symbol: string;

	@Field(() => String, { description: "Name" })
	name: string;

	@Field(() => String, { description: "Currency" })
	currency: string;

	@Field(() => String, { description: "Stock exchange", nullable: true })
	stockExchange?: string;

	@Field(() => String, { description: "Exchange short name" })
	exchangeShortName: string;
}

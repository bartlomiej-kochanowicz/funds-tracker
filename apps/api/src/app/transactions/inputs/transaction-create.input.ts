import { InputType, Field } from "@nestjs/graphql";
import { InstrumentCreateInput } from "@src/app/instruments/inputs/instrument-create.input";
import { IsNumber, IsUUID, IsDate } from "class-validator";

@InputType()
export class TransactionCreateInput {
	@IsUUID()
	@Field(() => String)
	portfolioUuid: string;

	@IsUUID()
	@Field(() => String)
	cashAccountUuid: string;

	@Field(() => InstrumentCreateInput)
	instrument: InstrumentCreateInput;

	@IsDate()
	@Field(() => Date)
	date: Date;

	@IsNumber()
	@Field(() => Number)
	quantity: number;

	@IsNumber()
	@Field(() => Number)
	price: number;

	@IsNumber()
	@Field(() => Number)
	commission: number;
}

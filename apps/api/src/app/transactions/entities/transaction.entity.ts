import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { OperationType } from "@prisma/client";
import { Instrument } from "@src/app/instruments/entities/instrument.entity";

@ObjectType()
export class Transaction {
	@Field(() => ID, { description: "Transaction uuid." })
	uuid: string;

	@Field(() => Date, { description: "Date of purchase" })
	date: Date;

	@Field(() => OperationType, { description: "Operation type" })
	type: OperationType;

	@Field(() => Number, { description: "Quantity" })
	quantity: number;

	@Field(() => Number, { description: "Price" })
	price: number;

	@Field(() => Instrument, { description: "Instrument" })
	instrument: Instrument;
}

registerEnumType(OperationType, {
	name: "OperationType",
});

import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsString, IsUUID } from "class-validator";

@ObjectType()
export class Instrument {
	@IsUUID()
	@Field(() => ID, { description: "Instrument uuid." })
	uuid: string;

	@IsString()
	@Field(() => String, { description: "Code" })
	symbol: string;

	@IsString()
	@Field(() => String, { description: "Name" })
	name: string;

	@Field(() => String, { description: "Instrument currency" })
	currency: string;
}

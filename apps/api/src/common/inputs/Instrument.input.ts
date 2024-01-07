import { Field, InputType } from "@nestjs/graphql";
import { InstrumentType } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class Instrument {
	@Field(() => InstrumentType)
	type: InstrumentType;

	@IsString()
	@Field(() => String)
	code: string;

	@IsString()
	@Field(() => String)
	exchange: string;

	@IsString()
	@IsOptional()
	@Field(() => String, { nullable: true })
	ISIN?: string;
}

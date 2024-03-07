import { IsInstrumentType } from "@validators/InstrumentType";
import { InputType, Field, registerEnumType } from "@nestjs/graphql";
import { InstrumentType } from "@prisma/client/generator-build";
import { IsString } from "class-validator";

@InputType()
export class SearchInstrumentInput {
	@IsString()
	@Field(() => String, { description: "Instrument name." })
	name: string;

	@IsInstrumentType()
	@Field(() => InstrumentType, { description: "Instrument type." })
	type: keyof typeof InstrumentType;
}

registerEnumType(InstrumentType, {
	name: "InstrumentType",
});

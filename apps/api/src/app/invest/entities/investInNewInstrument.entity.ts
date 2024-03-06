import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class InvestInNewInstrument {
	@Field(() => Boolean, { description: "Invest success" })
	success: boolean;
}

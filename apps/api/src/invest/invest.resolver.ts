import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { GetCurrentUserId } from "@app/common/decorators";
import { InvestService } from "./invest.service";
import { InvestInNewInstrument } from "./entities/investInNewInstrument.entity";
import { InvestInNewInstrumentInput } from "./inputs/investInNewInstrument.input";

@Resolver()
export class InvestResolver {
	constructor(private readonly investService: InvestService) {}

	@Mutation(() => InvestInNewInstrument)
	investInNewInstrument(
		@GetCurrentUserId() userUuid: string,
		@Args("data") data: InvestInNewInstrumentInput,
	) {
		return this.investService.investInNewInstrumentInput(userUuid, data);
	}
}

import { CreateWalletInput } from "./create-wallet.input";
import { InputType, Field, PartialType, ID } from "@nestjs/graphql";

@InputType()
export class UpdateWalletInput extends PartialType(CreateWalletInput) {
	@Field(() => ID)
	uuid: string;

	@Field(() => String)
	name: string;
}

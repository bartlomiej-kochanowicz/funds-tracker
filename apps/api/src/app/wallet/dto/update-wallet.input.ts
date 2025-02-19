import { CreateWalletInput } from "./create-wallet.input";
import { InputType, Field, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateWalletInput extends PartialType(CreateWalletInput) {
	@Field(() => String)
	name: string;
}

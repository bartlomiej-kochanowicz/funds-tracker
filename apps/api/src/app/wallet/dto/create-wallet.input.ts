import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateWalletInput {
	@Field(() => String)
	name: string;
}

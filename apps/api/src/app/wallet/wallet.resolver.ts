import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { WalletService } from "./wallet.service";
import { Wallet } from "./entities/wallet.entity";
import { CreateWalletInput } from "./dto/create-wallet.input";
import { UpdateWalletInput } from "./dto/update-wallet.input";
import { GetCurrentUserId } from "@src/decorators/get-current-user-id.decorator";

@Resolver(() => Wallet)
export class WalletResolver {
	constructor(private readonly walletService: WalletService) {}

	@Mutation(() => Wallet)
	createWallet(
		@GetCurrentUserId() userId: string,
		@Args("createWalletInput") createWalletInput: CreateWalletInput,
	): Promise<Wallet> {
		return this.walletService.create(userId, createWalletInput);
	}

	@Query(() => [Wallet], { name: "wallets" })
	findAll(@GetCurrentUserId() userId: string): Promise<Wallet[]> {
		return this.walletService.findAll(userId);
	}

	@Query(() => Wallet, { name: "wallet" })
	findOne(
		@GetCurrentUserId() userId: string,
		@Args("uuid", { type: () => String }) uuid: string,
	): Promise<Wallet> {
		return this.walletService.findOne(userId, uuid);
	}

	@Mutation(() => Wallet)
	updateWallet(
		@GetCurrentUserId() userId: string,
		@Args("data") updateWalletInput: UpdateWalletInput,
	): Promise<Wallet> {
		return this.walletService.update(userId, updateWalletInput);
	}

	@Mutation(() => ({ success: Boolean }))
	removeWallet(
		@GetCurrentUserId() userId: string,
		@Args("uuid", { type: () => String }) uuid: string,
	): Promise<{ success: boolean }> {
		return this.walletService.remove(userId, uuid);
	}
}

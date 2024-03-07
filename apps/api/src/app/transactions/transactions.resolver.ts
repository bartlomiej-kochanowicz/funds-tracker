import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { GetCurrentUserId } from "@decorators/get-current-user-id.decorator";
import { TransactionsService } from "./transactions.service";
import { CreateTransaction } from "./entities/createTransaction.entity";
import { CreateTransactionInput } from "./inputs/createTransaction.input";

@Resolver()
export class TransactionsResolver {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Mutation(() => CreateTransaction)
	createTransaction(
		@GetCurrentUserId() userUuid: string,
		@Args("data") data: CreateTransactionInput,
	) {
		return this.transactionsService.createTransaction(userUuid, data);
	}
}

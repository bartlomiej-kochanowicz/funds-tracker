import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { GetCurrentUserId } from "@decorators/get-current-user-id.decorator";
import { TransactionsService } from "./transactions.service";
import { TransactionCreate } from "./entities/transaction-create.entity";
import { TransactionCreateInput } from "./inputs/transaction-create.input";

@Resolver()
export class TransactionsResolver {
	constructor(private readonly transactionsService: TransactionsService) {}

	@Mutation(() => TransactionCreate)
	transactionCreate(
		@GetCurrentUserId() userUuid: string,
		@Args("data") data: TransactionCreateInput,
	) {
		return this.transactionsService.transactionCreate(userUuid, data);
	}
}

import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TransactionsService } from "./transactions.service";
import { TransactionsResolver } from "./transactions.resolver";

@Module({ imports: [HttpModule], providers: [TransactionsResolver, TransactionsService] })
export class TransactionsModule {}

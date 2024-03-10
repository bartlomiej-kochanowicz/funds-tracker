import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TransactionsService } from "./transactions.service";
import { TransactionsResolver } from "./transactions.resolver";
import { InstrumentsModule } from "@app/instruments/instruments.module";

@Module({
	imports: [HttpModule, InstrumentsModule],
	providers: [TransactionsResolver, TransactionsService],
})
export class TransactionsModule {}

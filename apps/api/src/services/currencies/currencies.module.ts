import { Module } from "@nestjs/common";
import { CurrenciesService } from "./currencies.service";
import { HttpModule } from "@nestjs/axios";

@Module({
	imports: [HttpModule],
	providers: [CurrenciesService],
	exports: [CurrenciesService],
})
export class CurrenciesModule {}

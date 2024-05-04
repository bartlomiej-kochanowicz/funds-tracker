import { Module } from "@nestjs/common";
import { MarketService } from "./market.service";
import { HttpModule } from "@nestjs/axios";

@Module({
	imports: [HttpModule],
	providers: [MarketService],
	exports: [MarketService],
})
export class MarketModule {}

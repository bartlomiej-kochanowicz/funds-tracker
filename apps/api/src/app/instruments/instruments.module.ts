import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { InstrumentsService } from "./instruments.service";
import { InstrumentsResolver } from "./instruments.resolver";
import { MarketModule } from "@services/market/market.module";

@Module({
	imports: [HttpModule, MarketModule],
	providers: [InstrumentsService, InstrumentsResolver],
	exports: [InstrumentsService],
})
export class InstrumentsModule {}

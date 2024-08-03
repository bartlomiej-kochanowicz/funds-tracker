import { Module } from "@nestjs/common";
import { InstrumentsService } from "./instruments.service";
import { InstrumentsResolver } from "./instruments.resolver";
import { MarketModule } from "@services/market/market.module";

@Module({
	imports: [MarketModule],
	providers: [InstrumentsService, InstrumentsResolver],
	exports: [InstrumentsService],
})
export class InstrumentsModule {}

import { Module } from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";
import { PortfoliosResolver } from "./portfolios.resolver";
import { UserModule } from "../user/user.module";
import { MarketModule } from "@src/services/market/market.module";
import { CurrenciesModule } from "@src/services/currencies/currencies.module";

@Module({
	imports: [UserModule, MarketModule, CurrenciesModule],
	providers: [PortfoliosResolver, PortfoliosService],
})
export class PortfoliosModule {}

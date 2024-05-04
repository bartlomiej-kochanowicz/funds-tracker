import { Module } from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";
import { PortfoliosResolver } from "./portfolios.resolver";
import { UserModule } from "../user/user.module";
import { MarketModule } from "@src/services/market/market.module";

@Module({
	imports: [UserModule, MarketModule],
	providers: [PortfoliosResolver, PortfoliosService],
})
export class PortfoliosModule {}

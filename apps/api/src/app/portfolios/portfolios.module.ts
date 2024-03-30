import { Module } from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";
import { PortfoliosResolver } from "./portfolios.resolver";
import { UserModule } from "../user/user.module";

@Module({
	imports: [UserModule],
	providers: [PortfoliosResolver, PortfoliosService],
})
export class PortfoliosModule {}

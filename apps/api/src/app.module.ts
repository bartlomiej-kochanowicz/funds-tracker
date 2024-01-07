import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { ApolloDriver } from "@nestjs/apollo";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { AtGuard } from "@common/guards";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { CashAccountsModule } from "./cash-accounts/cash-accounts.module";
import { InstrumentsModule } from "./instruments/instruments.module";
import { PortfoliosModule } from "./portfolios/portfolios.module";
import { UserModule } from "./user/user.module";
import { InvestModule } from "./invest/invest.module";
import { CurrenciesModule } from "./currencies/currencies.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		RedisModule.forRoot({
			config: {
				host: process.env.REDIS_URL,
				port: Number(process.env.REDIS_PORT),
			},
		}),
		GraphQLModule.forRoot({
			driver: ApolloDriver,
			autoSchemaFile: "schema.gql",
			context: ({ req, res }) => ({ req, res }),
			cors: {
				credentials: true,
			},
		}),
		PrismaModule,
		AuthModule,
		CashAccountsModule,
		InstrumentsModule,
		PortfoliosModule,
		UserModule,
		InvestModule,
		CurrenciesModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
	],
})
export class AppModule {}

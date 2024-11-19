import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { ApolloDriver } from "@nestjs/apollo";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { PrismaModule } from "./services/prisma/prisma.module";
import { CashAccountsModule } from "./app/cash-accounts/cash-accounts.module";
import { InstrumentsModule } from "./app/instruments/instruments.module";
import { PortfoliosModule } from "./app/portfolios/portfolios.module";
import { TransactionsModule } from "./app/transactions/transactions.module";
import { CurrenciesModule } from "./services/currencies/currencies.module";
import { AuthModule } from "./app/auth/auth.module";
import { TestModule } from "./app/test/test.module";

@Module({
	imports: [
		AuthModule.forRoot({
			connectionURI: "http://localhost:3567",
			appInfo: {
				appName: "Funds Tracker",
				apiDomain: "http://localhost:4000",
				websiteDomain: "http://localhost:3000",
				apiBasePath: "/auth",
				websiteBasePath: "/auth",
			},
		}),
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
		CashAccountsModule,
		InstrumentsModule,
		PortfoliosModule,
		TransactionsModule,
		CurrenciesModule,
		TransactionsModule,
		TestModule,
	],
	controllers: [],
})
export class AppModule {}

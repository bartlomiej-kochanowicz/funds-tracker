import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { ApolloDriver } from "@nestjs/apollo";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { AtGuard } from "@guards/at.guard";
import { PrismaModule } from "./services/prisma/prisma.module";
import { AuthModule } from "./app/auth/auth.module";

import { UserModule } from "./app/user/user.module";
import { CurrenciesModule } from "./services/currencies/currencies.module";
import { HealthCheckController } from "./health-check/health-check.controller";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		RedisModule.forRoot({
			config: {
				url: process.env.REDIS_URL,
				host: process.env.REDIS_URL,
				port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
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
		UserModule,
		CurrenciesModule,
	],
	controllers: [HealthCheckController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
	],
})
export class AppModule {}

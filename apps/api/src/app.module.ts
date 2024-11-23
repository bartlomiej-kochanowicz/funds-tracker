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
		UserModule,
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

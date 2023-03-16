import { APP_GUARD } from '@nestjs/core';
import { Module, CacheModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { AtGuard } from 'common/guards';
import * as redisStore from 'cache-manager-redis-store';
import { REDIS_PORT, REDIS_URL } from 'common/config/env';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CashAccountsModule } from './cash-accounts/cash-accounts.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: REDIS_URL,
      port: REDIS_PORT,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
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

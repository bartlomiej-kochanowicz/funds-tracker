"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const config_1 = require("@nestjs/config");
const apollo_1 = require("@nestjs/apollo");
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const at_guard_1 = require("./guards/at.guard");
const prisma_module_1 = require("./services/prisma/prisma.module");
const auth_module_1 = require("./app/auth/auth.module");
const user_module_1 = require("./app/user/user.module");
const currencies_module_1 = require("./services/currencies/currencies.module");
const health_check_controller_1 = require("./health-check/health-check.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_redis_1.RedisModule.forRoot({
                config: {
                    url: process.env.REDIS_URL,
                    host: process.env.REDIS_URL,
                    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined,
                },
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: "schema.gql",
                context: ({ req, res }) => ({ req, res }),
                cors: {
                    credentials: true,
                },
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            currencies_module_1.CurrenciesModule,
        ],
        controllers: [health_check_controller_1.HealthCheckController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: at_guard_1.AtGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
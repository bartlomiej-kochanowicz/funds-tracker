import { INestApplication, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    cleanDatabase(): Promise<void>;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}

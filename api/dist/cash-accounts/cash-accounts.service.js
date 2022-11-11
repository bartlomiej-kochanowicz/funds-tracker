"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashAccountsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../common/constants/common");
const collection_service_1 = require("../common/services/collection.service");
const prisma_service_1 = require("../prisma/prisma.service");
let CashAccountsService = class CashAccountsService {
    constructor(prisma, collection) {
        this.prisma = prisma;
        this.collection = collection;
    }
    async create(userUuid, createCashAccountDto) {
        const cashAccounts = await this.prisma.cashAccounts.count({
            where: {
                userUuid,
            },
        });
        const { cashAccounts: newCashAccounts } = createCashAccountDto;
        if (cashAccounts + newCashAccounts.length > common_2.MAX_CASH_ACCOUNTS) {
            throw new common_1.HttpException('Max accounts reached', common_1.HttpStatus.FORBIDDEN);
        }
        await this.prisma.cashAccounts.createMany({
            data: newCashAccounts.map(({ name, currency }) => ({
                name,
                currency,
                userUuid,
            })),
        });
        return null;
    }
    async findAll(userUuid) {
        const cashAccounts = await this.prisma.cashAccounts.findMany({
            where: {
                userUuid,
            },
            select: {
                uuid: true,
                name: true,
                currency: true,
                balance: true,
            },
        });
        console.log(this.collection.test());
        return cashAccounts;
    }
    async findOne(userUuid, uuid) {
        const cashAccount = await this.prisma.cashAccounts.findUnique({
            where: {
                userUuid_uuid: {
                    userUuid,
                    uuid,
                },
            },
            select: {
                uuid: true,
                name: true,
                currency: true,
                balance: true,
            },
        });
        if (!cashAccount) {
            throw new common_1.HttpException('Account not fount', common_1.HttpStatus.NOT_FOUND);
        }
        return cashAccount;
    }
    async update(userUuid, uuid, updateCashAccountDto) {
        try {
            await this.prisma.cashAccounts.update({
                where: {
                    userUuid_uuid: {
                        userUuid,
                        uuid,
                    },
                },
                data: updateCashAccountDto,
            });
            return null;
        }
        catch (_a) {
            throw new common_1.HttpException('Account not fount', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async remove(userUuid, uuid) {
        try {
            await this.prisma.cashAccounts.delete({
                where: {
                    userUuid_uuid: {
                        userUuid,
                        uuid,
                    },
                },
            });
            return null;
        }
        catch (_a) {
            throw new common_1.HttpException('Account not fount', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
CashAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        collection_service_1.CollectionService])
], CashAccountsService);
exports.CashAccountsService = CashAccountsService;
//# sourceMappingURL=cash-accounts.service.js.map
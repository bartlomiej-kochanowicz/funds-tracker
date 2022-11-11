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
const prisma_service_1 = require("../prisma/prisma.service");
let CashAccountsService = class CashAccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userUuid, createCashAccountDto) {
        const { name, currency } = createCashAccountDto;
        const cashAccounts = await this.prisma.cashAccounts.count({
            where: {
                userUuid,
            },
        });
        if (cashAccounts >= common_2.MAX_CASH_ACCOUNTS) {
            throw new common_1.HttpException('Max accounts reached', common_1.HttpStatus.FORBIDDEN);
        }
        const cashAccount = await this.prisma.cashAccounts.create({
            data: {
                name,
                currency,
                userUuid,
            },
        });
        return cashAccount;
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
        return cashAccounts;
    }
    findOne(id) {
        return `This action returns a #${id} cashAccount`;
    }
    update(id, updateCashAccountDto) {
        return `This action updates a #${id} cashAccount`;
    }
    remove(id) {
        return `This action removes a #${id} cashAccount`;
    }
};
CashAccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CashAccountsService);
exports.CashAccountsService = CashAccountsService;
//# sourceMappingURL=cash-accounts.service.js.map
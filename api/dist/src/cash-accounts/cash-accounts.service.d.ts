import { PrismaService } from 'prisma/prisma.service';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';
export declare class CashAccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userUuid: string, createCashAccountDto: CreateCashAccountDto): Promise<import("@prisma/client").CashAccounts>;
    findAll(userUuid: string): Promise<{
        name: string;
        currency: string;
        uuid: string;
        balance: number;
    }[]>;
    findOne(userUuid: string, uuid: string): Promise<{
        name: string;
        currency: string;
        uuid: string;
        balance: number;
    }>;
    update(id: number, updateCashAccountDto: UpdateCashAccountDto): string;
    remove(id: number): string;
}

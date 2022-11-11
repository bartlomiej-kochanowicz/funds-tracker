import { CollectionService } from 'common/services/collection.service';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';
export declare class CashAccountsService {
    private prisma;
    private collection;
    constructor(prisma: PrismaService, collection: CollectionService);
    create(userUuid: string, createCashAccountDto: CreateCashAccountDto): Promise<any>;
    findAll(userUuid: string): Promise<{
        name: string;
        uuid: string;
        currency: string;
        balance: number;
    }[]>;
    findOne(userUuid: string, uuid: string): Promise<{
        name: string;
        uuid: string;
        currency: string;
        balance: number;
    }>;
    update(userUuid: string, uuid: string, updateCashAccountDto: UpdateCashAccountDto): Promise<any>;
    remove(userUuid: string, uuid: string): Promise<any>;
}

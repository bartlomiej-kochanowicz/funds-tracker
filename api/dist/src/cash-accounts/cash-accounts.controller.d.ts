import { CashAccountsService } from './cash-accounts.service';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';
export declare class CashAccountsController {
    private readonly cashAccountsService;
    constructor(cashAccountsService: CashAccountsService);
    create(userId: string, createCashAccountDto: CreateCashAccountDto): Promise<import("@prisma/client").CashAccounts>;
    findAll(userId: string): Promise<{
        name: string;
        currency: string;
        uuid: string;
        balance: number;
    }[]>;
    findOne(userId: string, uuid: string): Promise<{
        name: string;
        currency: string;
        uuid: string;
        balance: number;
    }>;
    update(id: string, updateCashAccountDto: UpdateCashAccountDto): string;
    remove(id: string): string;
}

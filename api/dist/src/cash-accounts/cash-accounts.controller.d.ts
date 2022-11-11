import { CashAccountsService } from './cash-accounts.service';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';
export declare class CashAccountsController {
    private readonly cashAccountsService;
    constructor(cashAccountsService: CashAccountsService);
    create(userId: string, createCashAccountDto: CreateCashAccountDto): Promise<any>;
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
    update(userId: string, uuid: string, updateCashAccountDto: UpdateCashAccountDto): Promise<any>;
    remove(userId: string, uuid: string): Promise<any>;
}

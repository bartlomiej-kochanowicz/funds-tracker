import { CashAccountsService } from './cash-accounts.service';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';
export declare class CashAccountsController {
    private readonly cashAccountsService;
    constructor(cashAccountsService: CashAccountsService);
    create(createCashAccountDto: CreateCashAccountDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCashAccountDto: UpdateCashAccountDto): string;
    remove(id: string): string;
}

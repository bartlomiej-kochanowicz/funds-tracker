import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';
export declare class CashAccountsService {
    create(createCashAccountDto: CreateCashAccountDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCashAccountDto: UpdateCashAccountDto): string;
    remove(id: number): string;
}

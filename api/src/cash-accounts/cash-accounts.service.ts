import { Injectable } from '@nestjs/common';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';

@Injectable()
export class CashAccountsService {
  create(createCashAccountDto: CreateCashAccountDto) {
    return 'This action adds a new cashAccount';
  }

  findAll() {
    return `This action returns all cashAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashAccount`;
  }

  update(id: number, updateCashAccountDto: UpdateCashAccountDto) {
    return `This action updates a #${id} cashAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashAccount`;
  }
}

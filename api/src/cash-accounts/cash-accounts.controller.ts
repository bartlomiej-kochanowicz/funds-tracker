import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashAccountsService } from './cash-accounts.service';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';

@Controller('cash-accounts')
export class CashAccountsController {
  constructor(private readonly cashAccountsService: CashAccountsService) {}

  @Post()
  create(@Body() createCashAccountDto: CreateCashAccountDto) {
    return this.cashAccountsService.create(createCashAccountDto);
  }

  @Get()
  findAll() {
    return this.cashAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashAccountDto: UpdateCashAccountDto) {
    return this.cashAccountsService.update(+id, updateCashAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashAccountsService.remove(+id);
  }
}

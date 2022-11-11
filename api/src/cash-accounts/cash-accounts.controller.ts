import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GetCurrentUserId } from 'common/decorators';
import { CashAccountsService } from './cash-accounts.service';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';

@Controller('cash-accounts')
export class CashAccountsController {
  constructor(private readonly cashAccountsService: CashAccountsService) {}

  @Post()
  create(
    @GetCurrentUserId() userId: string,
    @Body() createCashAccountDto: CreateCashAccountDto,
  ) {
    return this.cashAccountsService.create(userId, createCashAccountDto);
  }

  @Get()
  findAll(@GetCurrentUserId() userId: string) {
    return this.cashAccountsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashAccountsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCashAccountDto: UpdateCashAccountDto,
  ) {
    return this.cashAccountsService.update(+id, updateCashAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashAccountsService.remove(+id);
  }
}

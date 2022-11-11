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
    @Body() createCashAccountDto: CreateCashAccountDto | CreateCashAccountDto[],
  ) {
    return this.cashAccountsService.create(userId, createCashAccountDto);
  }

  @Get()
  findAll(@GetCurrentUserId() userId: string) {
    return this.cashAccountsService.findAll(userId);
  }

  @Get(':uuid')
  findOne(@GetCurrentUserId() userId: string, @Param('uuid') uuid: string) {
    return this.cashAccountsService.findOne(userId, uuid);
  }

  @Patch(':uuid')
  update(
    @GetCurrentUserId() userId: string,
    @Param('uuid') uuid: string,
    @Body() updateCashAccountDto: UpdateCashAccountDto,
  ) {
    return this.cashAccountsService.update(userId, uuid, updateCashAccountDto);
  }

  @Delete(':uuid')
  remove(@GetCurrentUserId() userId: string, @Param('uuid') uuid: string) {
    return this.cashAccountsService.remove(userId, uuid);
  }
}

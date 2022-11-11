import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MAX_CASH_ACCOUNTS } from 'common/constants/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';

@Injectable()
export class CashAccountsService {
  constructor(private prisma: PrismaService) {}

  async create(userUuid: string, createCashAccountDto: CreateCashAccountDto) {
    const { name, currency } = createCashAccountDto;

    const cashAccounts = await this.prisma.cashAccounts.count({
      where: {
        userUuid,
      },
    });

    if (cashAccounts >= MAX_CASH_ACCOUNTS) {
      throw new HttpException('Max accounts reached', HttpStatus.FORBIDDEN);
    }

    const cashAccount = await this.prisma.cashAccounts.create({
      data: {
        name,
        currency,
        userUuid,
      },
    });

    return cashAccount;
  }

  async findAll(userUuid: string) {
    const cashAccounts = await this.prisma.cashAccounts.findMany({
      where: {
        userUuid,
      },
      select: {
        uuid: true,
        name: true,
        currency: true,
        balance: true,
      },
    });

    return cashAccounts;
  }

  async findOne(userUuid: string, uuid: string) {
    const cashAccount = await this.prisma.cashAccounts.findUnique({
      where: {
        userUuid_uuid: {
          userUuid,
          uuid,
        },
      },
      select: {
        uuid: true,
        name: true,
        currency: true,
        balance: true,
      },
    });

    if (!cashAccount) {
      throw new HttpException('Account not fount', HttpStatus.NOT_FOUND);
    }

    return cashAccount;
  }

  async update(
    userUuid: string,
    uuid: string,
    updateCashAccountDto: UpdateCashAccountDto,
  ) {
    try {
      const cashAccount = await this.prisma.cashAccounts.update({
        where: {
          userUuid_uuid: {
            userUuid,
            uuid,
          },
        },
        data: updateCashAccountDto,
        select: {
          uuid: true,
          name: true,
          balance: true,
          currency: true,
        },
      });

      return cashAccount;
    } catch {
      throw new HttpException('Account not fount', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cashAccount`;
  }
}

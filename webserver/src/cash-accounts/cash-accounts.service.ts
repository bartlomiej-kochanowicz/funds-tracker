import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MAX_CASH_ACCOUNTS } from 'common/constants/common';
import { PrismaService } from 'prisma/prisma.service';
import { CashAccount } from './entities';
import { CashAccountHistory } from './entities/cash-account-history.entity';
import { CreateCashAccountInput, UpdateCashAccountInput } from './inputs';

@Injectable()
export class CashAccountsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userUuid: string,
    createCashAccountInput: CreateCashAccountInput,
  ): Promise<Omit<CashAccount, 'history'>> {
    const cashAccounts = await this.prisma.cashAccount.count({
      where: {
        userUuid,
      },
    });

    const { name, currency } = createCashAccountInput;

    if (cashAccounts > MAX_CASH_ACCOUNTS) {
      throw new HttpException('Max accounts reached', HttpStatus.FORBIDDEN);
    }

    const cashAccount = await this.prisma.cashAccount.create({
      data: {
        userUuid,
        name,
        currency,
      },
    });

    return cashAccount;
  }

  async findAll(userUuid: string): Promise<Omit<CashAccount, 'history'>[]> {
    const cashAccounts = await this.prisma.cashAccount.findMany({
      where: {
        userUuid,
      },
    });

    return cashAccounts;
  }

  async findOne(userUuid: string, uuid: string): Promise<Omit<CashAccount, 'history'>> {
    const cashAccount = await this.prisma.cashAccount.findUnique({
      where: {
        userUuid_uuid: {
          userUuid,
          uuid,
        },
      },
    });

    if (!cashAccount) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    return cashAccount;
  }

  async findHistory(uuid: string, first: number): Promise<CashAccountHistory[]> {
    const cashAccountHistory = await this.prisma.cashAccountHistory.findMany({
      where: {
        uuid,
      },
      orderBy: { date: 'asc' },
      take: first,
    });

    if (!cashAccountHistory) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    return cashAccountHistory;
  }

  async update(
    userUuid: string,
    uuid: string,
    updateCashAccountInput: UpdateCashAccountInput,
  ): Promise<Omit<CashAccount, 'history'>> {
    try {
      const cashAccount = await this.prisma.cashAccount.update({
        where: {
          userUuid_uuid: {
            userUuid,
            uuid,
          },
        },
        data: updateCashAccountInput,
      });

      return cashAccount;
    } catch {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(userUuid: string, uuid: string) {
    try {
      const cashAccount = await this.prisma.cashAccount.delete({
        where: {
          userUuid_uuid: {
            userUuid,
            uuid,
          },
        },
      });

      return cashAccount;
    } catch {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
  }
}

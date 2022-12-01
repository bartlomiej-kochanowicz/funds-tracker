import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MAX_CASH_ACCOUNTS } from 'common/constants/common';
import { PrismaService } from 'prisma/prisma.service';
import { CashAccount } from './entities';
import { CreateCashAccountInput, UpdateCashAccountInput } from './inputs';

@Injectable()
export class CashAccountsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userUuid: string,
    createCashAccountInput: CreateCashAccountInput,
  ): Promise<CashAccount> {
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

  async findAll(userUuid: string): Promise<CashAccount[]> {
    const cashAccounts = await this.prisma.cashAccount.findMany({
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

  async findOne(userUuid: string, uuid: string): Promise<CashAccount> {
    const cashAccount = await this.prisma.cashAccount.findUnique({
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
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    return cashAccount;
  }

  async update(
    userUuid: string,
    uuid: string,
    updateCashAccountInput: UpdateCashAccountInput,
  ): Promise<CashAccount> {
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
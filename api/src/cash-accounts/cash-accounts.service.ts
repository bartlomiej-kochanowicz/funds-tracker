import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MAX_CASH_ACCOUNTS } from 'common/constants/common';
import { PrismaService } from 'prisma/prisma.service';
import { CashAccount } from './entities/cash-account.entity';
import { CreateCashAccountInput } from './inputs/create-cash-account.input';

@Injectable()
export class CashAccountsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userUuid: string,
    createCashAccountInput: CreateCashAccountInput,
  ): Promise<null> {
    const cashAccounts = await this.prisma.cashAccounts.count({
      where: {
        userUuid,
      },
    });

    const { name, currency } = createCashAccountInput;

    if (cashAccounts > MAX_CASH_ACCOUNTS) {
      throw new HttpException('Max accounts reached', HttpStatus.FORBIDDEN);
    }

    await this.prisma.cashAccounts.create({
      data: {
        userUuid,
        name,
        currency,
      },
    });

    return null;
  }

  async findAll(userUuid: string): Promise<CashAccount[]> {
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

  /* async findOne(userUuid: string, uuid: string): Promise<CashAccountDto> {
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
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    return cashAccount;
  }

  async update(
    userUuid: string,
    uuid: string,
    updateCashAccountDto: UpdateCashAccountDto,
  ) {
    try {
      await this.prisma.cashAccounts.update({
        where: {
          userUuid_uuid: {
            userUuid,
            uuid,
          },
        },
        data: updateCashAccountDto,
      });

      return null;
    } catch {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(userUuid: string, uuid: string) {
    try {
      await this.prisma.cashAccounts.delete({
        where: {
          userUuid_uuid: {
            userUuid,
            uuid,
          },
        },
      });

      return null;
    } catch {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
  } */
}

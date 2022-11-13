import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectionService } from 'collection/collection.service';
import { MAX_CASH_ACCOUNTS } from 'common/constants/common';
import { Pagination } from 'common/types/pagination.type';
import { PrismaService } from 'prisma/prisma.service';
import { CashAccountDto } from './dto/cash-account.dto';
import { CreateCashAccountDto } from './dto/create-cash-account.dto';
import { UpdateCashAccountDto } from './dto/update-cash-account.dto';

@Injectable()
export class CashAccountsService {
  constructor(
    private prisma: PrismaService,
    private collection: CollectionService,
  ) {}

  async create(userUuid: string, createCashAccountDto: CreateCashAccountDto) {
    const cashAccounts = await this.prisma.cashAccounts.count({
      where: {
        userUuid,
      },
    });

    const { cashAccounts: newCashAccounts } = createCashAccountDto;

    if (cashAccounts + newCashAccounts.length > MAX_CASH_ACCOUNTS) {
      throw new HttpException('Max accounts reached', HttpStatus.FORBIDDEN);
    }

    await this.prisma.cashAccounts.createMany({
      data: newCashAccounts.map(({ name, currency }) => ({
        name,
        currency,
        userUuid,
      })),
    });

    return null;
  }

  async findAll(
    userUuid: string,
    page: number,
    limit: number,
  ): Promise<Pagination<CashAccountDto>> {
    const count = await this.prisma.cashAccounts.count({
      where: {
        userUuid,
      },
    });

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
      skip: (page - 1) * limit,
      take: limit,
    });

    return this.collection.paginate<CashAccountDto>(
      cashAccounts,
      count,
      page,
      limit,
    );
  }

  async findOne(userUuid: string, uuid: string): Promise<CashAccountDto> {
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
      throw new HttpException('Account not fount', HttpStatus.NOT_FOUND);
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
      throw new HttpException('Account not fount', HttpStatus.NOT_FOUND);
    }
  }
}

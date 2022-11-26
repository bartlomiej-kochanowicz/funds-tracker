import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MAX_PORTFOLIOS } from 'common/constants/common';
import { PrismaService } from 'prisma/prisma.service';
import { Portfolio } from './entities';
import { CreatePortfolioInput, UpdatePortfolioInput } from './inputs';

@Injectable()
export class PortfoliosService {
  constructor(private prisma: PrismaService) {}

  async create(
    userUuid: string,
    createPortfolioInput: CreatePortfolioInput,
  ): Promise<Portfolio> {
    const portfolios = await this.prisma.portfolio.count({
      where: {
        userUuid,
      },
    });

    const { name, rebalancingEnabled } = createPortfolioInput;

    if (portfolios > MAX_PORTFOLIOS) {
      throw new HttpException('Max portfolios reached', HttpStatus.FORBIDDEN);
    }

    const portfolio = await this.prisma.portfolio.create({
      data: {
        name,
        rebalancingEnabled,
        userUuid,
      },
    });

    return portfolio;
  }

  async findAll(userUuid: string): Promise<Portfolio[]> {
    const portfolios = await this.prisma.portfolio.findMany({
      where: {
        userUuid,
      },
      select: {
        uuid: true,
        name: true,
        rebalancingEnabled: true,
      },
    });

    return portfolios;
  }

  async findOne(userUuid: string, uuid: string): Promise<Portfolio> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: {
        userUuid_uuid: {
          userUuid,
          uuid,
        },
      },
      select: {
        uuid: true,
        name: true,
        rebalancingEnabled: true,
      },
    });

    if (!portfolio) {
      throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
    }

    return portfolio;
  }

  async update(
    userUuid: string,
    uuid: string,
    updatePortfolioInput: UpdatePortfolioInput,
  ): Promise<Portfolio> {
    try {
      const portfolio = await this.prisma.portfolio.update({
        where: {
          userUuid_uuid: {
            userUuid,
            uuid,
          },
        },
        data: updatePortfolioInput,
      });

      return portfolio;
    } catch {
      throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(userUuid: string, uuid: string): Promise<Portfolio> {
    try {
      const portfolio = await this.prisma.portfolio.delete({
        where: {
          userUuid_uuid: {
            userUuid,
            uuid,
          },
        },
      });

      return portfolio;
    } catch {
      throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MAX_PORTFOLIOS } from 'common/constants/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfoliosService {
  constructor(private prisma: PrismaService) {}

  async create(
    userUuid: string,
    createPortfolioDto: CreatePortfolioDto,
  ): Promise<null> {
    const portfolios = await this.prisma.portfolio.count({
      where: {
        userUuid,
      },
    });

    const { name, rebalancingEnabled } = createPortfolioDto;

    if (portfolios > MAX_PORTFOLIOS) {
      throw new HttpException('Max portfolios reached', HttpStatus.FORBIDDEN);
    }

    await this.prisma.portfolio.create({
      data: {
        name,
        rebalancingEnabled,
        userUuid,
      },
    });

    return null;
  }

  async findAll(userUuid: string): Promise<CreatePortfolioDto[]> {
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

  async findOne(userUuid: string, uuid: string): Promise<CreatePortfolioDto> {
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

    return portfolio;
  }

  async update(
    userUuid: string,
    uuid: string,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<null> {
    try {
      await this.prisma.portfolio.update({
        where: {
          userUuid_uuid: {
            userUuid,
            uuid,
          },
        },
        data: updatePortfolioDto,
      });

      return null;
    } catch {
      throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(userUuid: string, uuid: string): Promise<null> {
    try {
      await this.prisma.portfolio.delete({
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
  }
}

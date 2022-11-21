import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CollectionService } from 'collection/collection.service';
import { MAX_PORTFOLIOS } from 'common/constants/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfoliosService {
  constructor(
    private prisma: PrismaService,
    private collection: CollectionService,
  ) {}

  async create(
    userUuid: string,
    createPortfolioDto: CreatePortfolioDto,
  ): Promise<null> {
    const portfolios = await this.prisma.portfolios.count({
      where: {
        userUuid,
      },
    });

    const { name, rebalancingEnabled } = createPortfolioDto;

    if (portfolios > MAX_PORTFOLIOS) {
      throw new HttpException('Max portfolios reached', HttpStatus.FORBIDDEN);
    }

    await this.prisma.portfolios.create({
      data: {
        name,
        rebalancingEnabled,
        userUuid,
      },
    });

    return null;
  }

  findAll() {
    return `This action returns all portfolios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}

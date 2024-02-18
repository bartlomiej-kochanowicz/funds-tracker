import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IntroductionStep } from "@prisma/client";
import { MAX_PORTFOLIOS } from "@common/constants/common";
import { PrismaService } from "@app/prisma/prisma.service";
import { IntroductionPortfolios, Portfolio, PortfolioDelete } from "./entities";
import {
	PortfolioCreateInput,
	IntroductionPortfolioCreatesInput,
	PortfolioUpdateInput,
} from "./inputs";

@Injectable()
export class PortfoliosService {
	constructor(private prisma: PrismaService) {}

	async create(userUuid: string, portfolioCreateInput: PortfolioCreateInput): Promise<Portfolio> {
		const portfolios = await this.prisma.portfolio.count({
			where: {
				userUuid,
			},
		});

		const { name } = portfolioCreateInput;

		if (portfolios > MAX_PORTFOLIOS) {
			throw new HttpException("Max portfolios reached", HttpStatus.FORBIDDEN);
		}

		const portfolio = await this.prisma.portfolio.create({
			data: {
				name,
				userUuid,
			},
		});

		return portfolio;
	}

	async introductionPortfolioCreates(
		userUuid: string,
		introductionPortfolioCreatesInput: IntroductionPortfolioCreatesInput,
	): Promise<IntroductionPortfolios> {
		const { introductionStep } = await this.prisma.user.findUnique({
			where: { uuid: userUuid },
			select: { introductionStep: true },
		});

		if (introductionStep !== IntroductionStep.Portfolios) {
			throw new HttpException("Introduction step not valid", HttpStatus.FORBIDDEN);
		}

		await this.prisma.portfolio.createMany({
			data: introductionPortfolioCreatesInput.portfolios.map(portfolio => ({
				userUuid,
				...portfolio,
			})),
		});

		await this.prisma.user.update({
			where: { uuid: userUuid },
			data: {
				introductionStep: IntroductionStep.Completed,
			},
		});

		return {
			success: true,
		};
	}

	async findAll(userUuid: string): Promise<Portfolio[]> {
		const portfolios = await this.prisma.portfolio.findMany({
			where: {
				userUuid,
			},
			select: {
				uuid: true,
				name: true,
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
			},
		});

		if (!portfolio) {
			throw new HttpException("Portfolio not found", HttpStatus.NOT_FOUND);
		}

		return portfolio;
	}

	async update(
		userUuid: string,
		uuid: string,
		portfolioUpdateInput: PortfolioUpdateInput,
	): Promise<Portfolio> {
		try {
			const portfolio = await this.prisma.portfolio.update({
				where: {
					userUuid_uuid: {
						userUuid,
						uuid,
					},
				},
				data: portfolioUpdateInput,
			});

			return portfolio;
		} catch {
			throw new HttpException("Portfolio not found", HttpStatus.NOT_FOUND);
		}
	}

	async delete(userUuid: string, uuid: string): Promise<PortfolioDelete> {
		try {
			await this.prisma.portfolio.delete({
				where: {
					userUuid_uuid: {
						userUuid,
						uuid,
					},
				},
			});

			return {
				success: true,
			};
		} catch {
			throw new HttpException("Portfolio not found", HttpStatus.NOT_FOUND);
		}
	}
}

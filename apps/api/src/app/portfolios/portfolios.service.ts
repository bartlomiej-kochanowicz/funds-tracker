import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IntroductionStep } from "@prisma/client";
import { MAX_PORTFOLIOS } from "@constants/common";
import { PrismaService } from "@services/prisma/prisma.service";
import { IntroductionPortfolios, Portfolio, PortfolioDelete, PortfolioSummary } from "./entities";
import {
	PortfolioCreateInput,
	IntroductionPortfolioCreatesInput,
	PortfolioUpdateInput,
	PortfolioSummaryInput,
} from "./inputs";
import { UserService } from "../user/user.service";

@Injectable()
export class PortfoliosService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
	) {}

	async create(
		userUuid: string,
		portfolioCreateInput: PortfolioCreateInput,
	): Promise<Partial<Portfolio>> {
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

	async findAll(userUuid: string): Promise<Partial<Portfolio>[]> {
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
				transactions: {
					select: {
						uuid: true,
						date: true,
						type: true,
						price: true,
						quantity: true,
						instrument: {
							select: {
								uuid: true,
								codeExchange: true,
								name: true,
								type: true,
								currency: true,
							},
						},
					},
				},
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
	): Promise<Partial<Portfolio>> {
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

	async portfolioSummary(userId: string, data: PortfolioSummaryInput): Promise<PortfolioSummary> {
		const { defaultCurrency } = await this.userService.getUser(userId);

		const { uuid, from, to, timeFrame } = data;

		return {
			data: [
				{
					date: "2024-02-29",
					marketValue: 1000,
					cash: 500,
				},
				{
					date: "2024-03-01",
					marketValue: 995,
					cash: 500,
				},
				{
					date: "2024-03-02",
					marketValue: 1106,
					cash: 500,
				},
				{
					date: "2024-03-03",
					marketValue: 885,
					cash: 1000,
				},
				{
					date: "2024-03-04",
					marketValue: 1200,
					cash: 1500,
				},
				{
					date: "2024-03-05",
					marketValue: 1300,
					cash: 1600,
				},
				{
					date: "2024-03-06",
					marketValue: 1400,
					cash: 1700,
				},
				{
					date: "2024-03-07",
					marketValue: 1500,
					cash: 1800,
				},
				{
					date: "2024-03-08",
					marketValue: 1400,
					cash: 1800,
				},
			],
		};
	}
}

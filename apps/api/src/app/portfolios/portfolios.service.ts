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
import { subDays } from "date-fns";

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
		const {
			/* defaultCurrency */
		} = await this.userService.getUser(userId);

		const { uuid, from, to } = data;

		const { cash: sumCash } = (
			await this.prisma.transaction.findMany({
				select: {
					price: true,
					quantity: true,
					commission: true,
				},
				where: {
					portfolioUuid: uuid,
					date: {
						gte: new Date(0),
						lte: subDays(from, 1),
					},
				},
			})
		).reduce(
			(acc, transaction) => {
				const price = transaction.price * transaction.quantity;

				return {
					cash: acc.cash + price,
					commission: acc.commission + transaction.commission,
				};
			},
			{
				cash: 0,
				commission: 0,
			},
		);

		const transactionsGroupedByDate = await this.prisma.transaction.groupBy({
			by: ["date"],
			where: {
				portfolioUuid: uuid,
				date: {
					gte: from,
					lte: to,
				},
			},
		});

		console.log("%%", from, to, transactionsGroupedByDate);

		const result = (
			await Promise.all(
				transactionsGroupedByDate.map(async ({ date }) => {
					const dayTransactions = await this.prisma.transaction.findMany({
						where: {
							date,
						},
						include: {
							instrument: true,
						},
					});

					const cash = dayTransactions.reduce((acc, transaction) => {
						const price = transaction.price * transaction.quantity;

						return acc + price;
					}, 0);

					return {
						date,
						cash: sumCash + cash,
						marketValue: 1000,
					};
				}),
			)
		).reduce((acc, entry) => {
			const previousSum = acc.length > 0 ? acc[acc.length - 1].cumulativeCash : 0;
			const cumulativeCash = previousSum + entry.cash;
			return [...acc, { date: entry.date, cumulativeCash, marketValue: entry.marketValue }];
		}, []);

		// console.log(result);

		return {
			data: result,
		};
	}
}

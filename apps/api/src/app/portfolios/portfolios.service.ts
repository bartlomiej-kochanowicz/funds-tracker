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
import { isBefore, addDays, min, subDays } from "date-fns";
import { MarketService } from "@services/market/market.service";
import { formatDate } from "@src/utils/format-date";
import { MarketHistoryDataResponse } from "@src/types/market";

@Injectable()
export class PortfoliosService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService,
		private marketService: MarketService,
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

		const { uuid, from, to } = data;

		const transactions = await this.getPortfolioTransactions(uuid);
		const instruments = [...new Set(transactions.map(({ instrument }) => instrument.codeExchange))];
		const history = await this.getInstrumentsHistoryByDate(instruments, from, to);

		const summary = transactions.reduce<
			{
				date: Date;
				cash: number;
				commission: number;
				quantity: number;
				codeExchange: string;
			}[]
		>((acc, transaction) => {
			return [
				...acc,
				{
					date: transaction.date,
					cash:
						Math.round(
							((acc[acc.length - 1]?.cash || 0) + transaction.price * transaction.quantity) * 100,
						) / 100,
					commission:
						Math.round(((acc[acc.length - 1]?.commission || 0) + transaction.commission) * 100) /
						100,
					quantity: transaction.quantity,
					codeExchange: transaction.instrument.codeExchange,
				},
			];
		}, []);

		const transactionsDatesArray = transactions.map(({ date }) => date);
		const minDate = min(transactionsDatesArray);

		let currentCash = 0;
		let currentCommission = 0;
		let prevDayValue = 0;
		const instrumentsQuantity = new Map(instruments.map(codeExchange => [codeExchange, 0]));

		const result = this.generateDateRangeDays(minDate, to).map(date => {
			const dayWithTransactions = summary.filter(
				entry => formatDate(entry.date) === formatDate(date),
			);

			dayWithTransactions.forEach(({ codeExchange, quantity }) => {
				instrumentsQuantity.set(codeExchange, instrumentsQuantity.get(codeExchange) + quantity);
			});

			const dailyValue = [0, 1, 2]
				.map(i => history[formatDate(subDays(date, i))])
				.filter(Boolean)[0];

			let currentMarketValue = 0;

			if (dailyValue) {
				instruments.forEach(codeExchange => {
					const { close } = dailyValue[codeExchange] || {};

					if (close) {
						currentMarketValue += close * instrumentsQuantity.get(codeExchange);
						prevDayValue = currentMarketValue;
					}
				});
			} else {
				currentMarketValue = prevDayValue;
			}

			// Calculate cash and commission
			const { cash, commission } = dayWithTransactions.at(-1) || {};

			if (cash) {
				currentCash = cash;
			}
			if (commission) {
				currentCommission = commission;
			}

			return {
				date,
				marketValue: currentMarketValue,
				cash: currentCash,
				commission: currentCommission,
			};
		});

		if (isBefore(from, minDate)) {
			const fill = this.generateDateRangeDays(from, minDate).map(date => ({
				date,
				marketValue: 0,
				cash: 0,
				commission: 0,
			}));

			result.unshift(...fill);
		}

		return {
			data: result.filter(({ date }) => date >= from && date <= to),
		};
	}

	private generateDateRangeDays(from: Date, to: Date): Date[] {
		const dates = [];
		let currentDate = new Date(from);

		while (isBefore(currentDate, new Date(to))) {
			dates.push(currentDate);
			currentDate = addDays(currentDate, 1);
		}

		return dates;
	}

	private async getPortfolioTransactions(uuid: string) {
		return (
			await this.prisma.transaction.findMany({
				where: {
					portfolioUuid: uuid,
				},
				include: {
					instrument: true,
				},
			})
		).sort((a, b) => Number(a.date) - Number(b.date));
	}

	private async getInstrumentsHistoryByDate(instruments: string[], from: Date, to: Date) {
		type HistoryRecord = Omit<MarketHistoryDataResponse[0], "date">;

		const history = (
			await Promise.all(
				instruments.map(async codeExchange => {
					const history = await this.marketService.getMarketInstrumentHistory({
						code: codeExchange.split(".")[0],
						exchange: codeExchange.split(".")[1],
						from: subDays(from, 3),
						to,
					});

					return { codeExchange, history };
				}),
			)
		).reduce(
			(
				acc: {
					[date: string]: { [codeExchange: string]: HistoryRecord };
				},
				item: {
					codeExchange: string;
					history: MarketHistoryDataResponse;
				},
			) => {
				item.history.forEach(record => {
					acc[record.date] ??= {};
					acc[record.date][item.codeExchange] = {
						open: record.open,
						high: record.high,
						low: record.low,
						close: record.close,
						adjusted_close: record.adjusted_close,
						volume: record.volume,
					};
				});
				return acc;
			},
			{},
		);

		return history;
	}
}

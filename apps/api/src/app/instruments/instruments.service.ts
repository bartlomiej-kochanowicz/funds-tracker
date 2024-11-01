import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InstrumentHistoryInput, SearchInstrumentInput } from "./inputs";
import { InstrumentHistory, SearchInstrument } from "./entities";
import { PrismaService } from "@services/prisma/prisma.service";
import { InstrumentCreateInput } from "./inputs/instrument-create.input";
import { Instrument } from "./entities/instrument.entity";
import { MarketService } from "@services/market/market.service";

@Injectable()
export class InstrumentsService {
	constructor(
		private prisma: PrismaService,
		private marketService: MarketService,
	) {}

	async search(searchInstrumentInput: SearchInstrumentInput): Promise<SearchInstrument[]> {
		const { name } = searchInstrumentInput;

		return this.marketService.getMarketInstrumentSearch(name);
	}

	async findHistory(instrumentHistoryInput: InstrumentHistoryInput): Promise<InstrumentHistory[]> {
		const data = await this.marketService.getMarketInstrumentHistory(instrumentHistoryInput);

		return data;
	}

	async getOrCreateInstrumentInDB(symbol: string): Promise<Instrument> {
		let instrument = await this.prisma.instrument.findUnique({
			where: {
				symbol,
			},
		});

		if (!instrument) {
			const data = await this.marketService.getInstrumentBaseInfo(symbol);

			if (!data) {
				throw new HttpException("Symbol not found", HttpStatus.NOT_FOUND);
			}

			instrument = await this.instrumentCreate({
				symbol: data.symbol,
				name: data.name,
				currency: data.currency,
			});
		}

		return instrument;
	}

	async instrumentCreate(data: InstrumentCreateInput): Promise<Instrument> {
		const instrument = await this.prisma.instrument.create({
			data: {
				symbol: data.symbol,
				name: data.name,
				currency: data.currency,
			},
		});

		return instrument;
	}
}

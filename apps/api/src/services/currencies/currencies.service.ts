import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom } from "rxjs";
import { GetCurrencyTimeseriesResponse } from "@src/types/currencies";

@Injectable()
export class CurrenciesService {
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
	) {}

	async timeseries(base: string, currencies: string[]) {
		return await Promise.all(
			currencies.map(currency => this.getHistoricalPriceFull(this.createSymbol(base, currency))),
		);
	}

	private createSymbol(base: string, currency: string) {
		return `${base.toUpperCase()}${currency.toLocaleUpperCase()}`;
	}

	private async getHistoricalPriceFull(symbol: string) {
		const { data } = await firstValueFrom(
			this.httpService
				.get<GetCurrencyTimeseriesResponse>(
					`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`,
					{
						params: {
							apikey: this.config.get("FINANCIAL_MODELING_API_KEY"),
						},
					},
				)
				.pipe(
					catchError(e => {
						console.error(e);

						throw Error("Error fetching currency timeseries");
					}),
				),
		);

		return data.historical;
	}
}

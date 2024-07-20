import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class CurrenciesService {
	constructor(
		private readonly httpService: HttpService,
		private config: ConfigService,
	) {}

	async timeseries(base: string, startDate: Date, endDate: Date, symbols: string[]) {
		const start_date = startDate.toISOString().split("T")[0];
		const end_date = endDate.toISOString().split("T")[0];

		console.log("@@@@", {
			api_key: this.config.get("CURRENCY_API_KEY"),
			base,
			start_date,
			end_date,
			symbols: symbols.join(","),
		});

		const { data } = await firstValueFrom(
			this.httpService
				.get<{
					response: {
						[key in string]: {
							[key in string]: number;
						};
					};
				}>("https://api.currencybeacon.com/v1/timeseries", {
					params: {
						api_key: this.config.get("CURRENCY_API_KEY"),
						base,
						start_date,
						end_date,
						symbols: symbols.join(","),
					},
				})
				.pipe(
					catchError(e => {
						console.error(e);

						throw Error("Error fetching currency timeseries");
					}),
				),
		);

		return data.response;
	}
}

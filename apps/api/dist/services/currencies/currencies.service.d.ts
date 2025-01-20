import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
export declare class CurrenciesService {
    private readonly httpService;
    private config;
    constructor(httpService: HttpService, config: ConfigService);
    timeseries(base: string, currencies: string[]): Promise<{
        date: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
    }[][]>;
    private createSymbol;
    private getHistoricalPriceFull;
}

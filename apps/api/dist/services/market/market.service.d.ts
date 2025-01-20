import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { GetInstrumentSearchResponse, GetInstrumentHistoryResponse } from "@src/types/market";
export declare class MarketService {
    private readonly httpService;
    private config;
    constructor(httpService: HttpService, config: ConfigService);
    getMarketInstrumentSearch(query: string): Promise<GetInstrumentSearchResponse>;
    getInstrumentBaseInfo(symbol: string): Promise<GetInstrumentSearchResponse[number] | null>;
    getMarketInstrumentHistory({ symbol, from, to, }: {
        symbol: string;
        from: Date;
        to?: Date;
        period?: "1d" | "1w" | "1m";
    }): Promise<GetInstrumentHistoryResponse["historical"]>;
}

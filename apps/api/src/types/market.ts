export type MarketDataSearchResponse = {
	symbol: string;
	name: string;
	currency: string;
	stockExchange: string | null;
	exchangeShortName: string;
}[];

export type MarketHistoryDataResponse = {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
}[];

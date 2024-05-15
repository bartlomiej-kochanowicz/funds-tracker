export type MarketDataSearchResponse = {
	Code: string;
	Exchange: string;
	Name: string;
	Type: string;
	Country: string;
	Currency: string;
	ISIN: string;
	previousClose: number;
	previousCloseDate: string;
}[];

export type MarketHistoryDataResponse = {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	adjusted_close: number;
	volume: number;
}[];

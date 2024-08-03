export type GetInstrumentSearchResponse = {
	symbol: string;
	name: string;
	currency: string;
	stockExchange: string | null;
	exchangeShortName: string;
}[];

export type GetInstrumentHistoryResponse = {
	symbol: string;
	historical: {
		date: string;
		open: number;
		high: number;
		low: number;
		close: number;
		volume: number;
	}[];
};

export type GetInstrumentShortResponse = {
	symbol: string;
	price: number;
	volume: number;
};

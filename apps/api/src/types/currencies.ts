export type GetCurrencyTimeseriesResponse = {
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

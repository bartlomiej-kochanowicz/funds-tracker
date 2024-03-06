type Limits = {
	maxCashAccounts: number;
	maxPortfolios: number;
};

export default {
	FREE: {
		maxCashAccounts: 2,
		maxPortfolios: 1,
	},
	LITE: {
		maxCashAccounts: 10,
		maxPortfolios: 5,
	},
	EXPERT: {
		maxCashAccounts: 20,
		maxPortfolios: 20,
	},
} satisfies {
	FREE: Limits;
	LITE: Limits;
	EXPERT: Limits;
};

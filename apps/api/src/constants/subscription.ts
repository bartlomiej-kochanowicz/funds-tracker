type Limits = {
	maxPortfolios: number;
};

export default {
	FREE: {
		maxPortfolios: 1,
	},
	LITE: {
		maxPortfolios: 5,
	},
	EXPERT: {
		maxPortfolios: 20,
	},
} satisfies {
	FREE: Limits;
	LITE: Limits;
	EXPERT: Limits;
};

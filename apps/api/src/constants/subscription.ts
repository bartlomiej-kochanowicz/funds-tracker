type Limits = {
	maxWallets: number;
};

const SUBSCRIPTION = {
	FREE: {
		maxWallets: 1,
	},
	LITE: {
		maxWallets: 5,
	},
	EXPERT: {
		maxWallets: 20,
	},
} satisfies {
	FREE: Limits;
	LITE: Limits;
	EXPERT: Limits;
};

export { SUBSCRIPTION };

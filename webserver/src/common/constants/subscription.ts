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
  PROFESSIONAL: {
    maxCashAccounts: 25,
    maxPortfolios: 15,
  },
  EXPERT: {
    maxCashAccounts: 100,
    maxPortfolios: 100,
  },
} satisfies {
  FREE: Limits;
  LITE: Limits;
  PROFESSIONAL: Limits;
  EXPERT: Limits;
};

type Limits = {
  maxCashAccounts: number;
};

export default {
  FREE: {
    maxCashAccounts: 2,
  },
  LITE: {
    maxCashAccounts: 10,
  },
  PROFESSIONAL: {
    maxCashAccounts: 25,
  },
  EXPERT: {
    maxCashAccounts: 100,
  },
} satisfies {
  FREE: Limits;
  LITE: Limits;
  PROFESSIONAL: Limits;
  EXPERT: Limits;
};

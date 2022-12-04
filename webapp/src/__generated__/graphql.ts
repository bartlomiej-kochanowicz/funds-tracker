/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CashAccount = {
  __typename?: 'CashAccount';
  /** Cash account currency. */
  currency: Currency;
  /** Cash account name. */
  name: Scalars['String'];
  /** Cash account uuid. */
  uuid: Scalars['String'];
};

export type CreateCashAccountInput = {
  /** Cash account currency. */
  currency: Currency;
  /** Cash account name. */
  name: Scalars['String'];
};

export type CreatePortfolioInput = {
  /** Portfolio name. */
  name: Scalars['String'];
  /** Is portfolio rebalancing enabled. */
  rebalancingEnabled: Scalars['Boolean'];
};

export enum Currency {
  Chf = 'CHF',
  Eur = 'EUR',
  Gbp = 'GBP',
  Pln = 'PLN',
  Usd = 'USD'
}

export type Email = {
  __typename?: 'Email';
  /** Email existence. */
  exist: Scalars['Boolean'];
};

export type EmailInput = {
  /** Email. */
  email: Scalars['String'];
  /** Token. */
  token: Scalars['String'];
};

export type Logout = {
  __typename?: 'Logout';
  /** Logout successful. */
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCashAccount: CashAccount;
  createPortfolio: Portfolio;
  deleteCashAccount: CashAccount;
  deletePortfolio: Portfolio;
  logout: Logout;
  refreshToken: Refresh;
  signinLocal: User;
  signupLocal: User;
  updateCashAccount: CashAccount;
  updatePortfolio: Portfolio;
};


export type MutationCreateCashAccountArgs = {
  data: CreateCashAccountInput;
};


export type MutationCreatePortfolioArgs = {
  data: CreatePortfolioInput;
};


export type MutationDeleteCashAccountArgs = {
  uuid: Scalars['String'];
};


export type MutationDeletePortfolioArgs = {
  uuid: Scalars['String'];
};


export type MutationSigninLocalArgs = {
  data: SigninInput;
};


export type MutationSignupLocalArgs = {
  data: SignupInput;
};


export type MutationUpdateCashAccountArgs = {
  data: UpdateCashAccountInput;
  uuid: Scalars['String'];
};


export type MutationUpdatePortfolioArgs = {
  data: UpdatePortfolioInput;
  uuid: Scalars['String'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  /** Portfolio name. */
  name: Scalars['String'];
  /** Is portfolio rebalancing enabled. */
  rebalancingEnabled: Scalars['Boolean'];
  /** Portfolio uuid. */
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cashAccount: CashAccount;
  cashAccounts: Array<CashAccount>;
  emailExist: Email;
  portfolio: Portfolio;
  portfolios: Array<Portfolio>;
  user: User;
};


export type QueryCashAccountArgs = {
  uuid: Scalars['String'];
};


export type QueryEmailExistArgs = {
  data: EmailInput;
};


export type QueryPortfolioArgs = {
  uuid: Scalars['String'];
};

export type Refresh = {
  __typename?: 'Refresh';
  /** Refresh successful. */
  success: Scalars['Boolean'];
};

export type SigninInput = {
  /** Email. */
  email: Scalars['String'];
  /** Password. */
  password: Scalars['String'];
  /** Token. */
  token: Scalars['String'];
};

export type SignupInput = {
  /** Email. */
  email: Scalars['String'];
  /** Name. */
  name: Scalars['String'];
  /** Password. */
  password: Scalars['String'];
  /** Token. */
  token: Scalars['String'];
};

export type UpdateCashAccountInput = {
  /** Cash account currency. */
  currency?: InputMaybe<Currency>;
  /** Cash account name. */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdatePortfolioInput = {
  /** Portfolio name. */
  name?: InputMaybe<Scalars['String']>;
  /** Is portfolio rebalancing enabled. */
  rebalancingEnabled?: InputMaybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  /** User date created. */
  createdAt: Scalars['DateTime'];
  /** User email. */
  email: Scalars['String'];
  /** User name. */
  name: Scalars['String'];
  /** User uuid. */
  uuid: Scalars['String'];
};

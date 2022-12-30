/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type ConfirmSignupInput = {
  /** Code. */
  code: Scalars['String'];
  /** Email. */
  email: Scalars['String'];
  /** Token. */
  token: Scalars['String'];
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
  confirmSignup: User;
  createCashAccount: CashAccount;
  createPortfolio: Portfolio;
  deleteCashAccount: CashAccount;
  deletePortfolio: Portfolio;
  logout: Logout;
  refreshToken: Refresh;
  sendCode: SendCode;
  signinLocal: User;
  signupLocal: Signup;
  updateCashAccount: CashAccount;
  updatePortfolio: Portfolio;
};


export type MutationConfirmSignupArgs = {
  data: ConfirmSignupInput;
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


export type MutationSendCodeArgs = {
  data: SendCodeInput;
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

export type SendCode = {
  __typename?: 'SendCode';
  /** Send code successful. */
  success: Scalars['Boolean'];
};

export type SendCodeInput = {
  /** Email. */
  email: Scalars['String'];
  /** Token. */
  token: Scalars['String'];
};

export type SigninInput = {
  /** Email. */
  email: Scalars['String'];
  /** Password. */
  password: Scalars['String'];
  /** Token. */
  token: Scalars['String'];
};

export type Signup = {
  __typename?: 'Signup';
  /** Signup successful. */
  success: Scalars['Boolean'];
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

export type ConfirmSignupMutationVariables = Exact<{
  data: ConfirmSignupInput;
}>;


export type ConfirmSignupMutation = { __typename?: 'Mutation', confirmSignup: { __typename?: 'User', uuid: string, name: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Logout', success: boolean } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Refresh', success: boolean } };

export type SendCodeMutationVariables = Exact<{
  data: SendCodeInput;
}>;


export type SendCodeMutation = { __typename?: 'Mutation', sendCode: { __typename?: 'SendCode', success: boolean } };

export type SigninMutationVariables = Exact<{
  data: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signinLocal: { __typename?: 'User', uuid: string, name: string } };

export type SignupMutationVariables = Exact<{
  data: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signupLocal: { __typename?: 'Signup', success: boolean } };

export type EmailExistQueryVariables = Exact<{
  data: EmailInput;
}>;


export type EmailExistQuery = { __typename?: 'Query', emailExist: { __typename?: 'Email', exist: boolean } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', uuid: string, name: string, email: string, createdAt: any } };


export const ConfirmSignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmSignup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmSignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<ConfirmSignupMutation, ConfirmSignupMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SendCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendCodeMutation, SendCodeMutationVariables>;
export const SigninDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SigninInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signinLocal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupLocal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const EmailExistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailExist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailExist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exist"}}]}}]}}]} as unknown as DocumentNode<EmailExistQuery, EmailExistQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
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
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
};

export type CashAccount = {
  __typename?: 'CashAccount';
  /** Account balance. */
  balance: Scalars['Float'];
  /** Cash account currency. */
  currency: Currency;
  /** Account balance history. */
  history: Array<CashAccountHistory>;
  /** Cash account name. */
  name: Scalars['String'];
  /** Cash account uuid. */
  uuid: Scalars['ID'];
};


export type CashAccountHistoryArgs = {
  first?: InputMaybe<Scalars['Float']>;
};

export type CashAccountHistory = {
  __typename?: 'CashAccountHistory';
  /** Cash account balance. */
  balance: Scalars['Float'];
  /** Date of the transaction. */
  date: Scalars['Date'];
  /** Transaction uuid. */
  uuid: Scalars['ID'];
};

export type ConfirmSignup = {
  __typename?: 'ConfirmSignup';
  /** Confirmatiopn signup successful. */
  success: Scalars['Boolean'];
};

export type ConfirmSignupInput = {
  /** Code. */
  code: Scalars['String'];
  /** Email. */
  email: Scalars['EmailAddress'];
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
  email: Scalars['EmailAddress'];
  /** Token. */
  token: Scalars['String'];
};

export type IntroductionCashAccounts = {
  __typename?: 'IntroductionCashAccounts';
  /** Cash accounts created successfully. */
  success: Scalars['Boolean'];
};

export type IntroductionCreateCashAccountsInput = {
  /** Cash accounts array. */
  cashAccounts: Array<CreateCashAccountInput>;
};

export type IntroductionCreatePortfoliosInput = {
  /** Portfolios array. */
  portfolios: Array<CreatePortfolioInput>;
};

export type IntroductionPortfolios = {
  __typename?: 'IntroductionPortfolios';
  /** Portfolios created successfully. */
  success: Scalars['Boolean'];
};

export enum IntroductionStep {
  CashAccounts = 'CashAccounts',
  Completed = 'Completed',
  DefaultCurrency = 'DefaultCurrency',
  Portfolios = 'Portfolios'
}

export type Logout = {
  __typename?: 'Logout';
  /** Logout successful. */
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmSignup: ConfirmSignup;
  createCashAccount: CashAccount;
  createPortfolio: Portfolio;
  deleteCashAccount: CashAccount;
  deletePortfolio: Portfolio;
  introductionCreateCashAccounts: IntroductionCashAccounts;
  introductionCreatePortfolios: IntroductionPortfolios;
  logout: Logout;
  refreshToken: Refresh;
  resetPassword: ResetPassword;
  sendCode: SendCode;
  setNewPassword: SetNewPassword;
  signinLocal: SigninLocal;
  signupLocal: SignupLocal;
  updateCashAccount: CashAccount;
  updatePortfolio: Portfolio;
  updateUser: User;
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
  uuid: Scalars['ID'];
};


export type MutationDeletePortfolioArgs = {
  uuid: Scalars['String'];
};


export type MutationIntroductionCreateCashAccountsArgs = {
  data: IntroductionCreateCashAccountsInput;
};


export type MutationIntroductionCreatePortfoliosArgs = {
  data: IntroductionCreatePortfoliosInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSendCodeArgs = {
  data: SendCodeInput;
};


export type MutationSetNewPasswordArgs = {
  data: SetNewPasswordInput;
};


export type MutationSigninLocalArgs = {
  data: SigninInput;
};


export type MutationSignupLocalArgs = {
  data: SignupInput;
};


export type MutationUpdateCashAccountArgs = {
  data: UpdateCashAccountInput;
  uuid: Scalars['ID'];
};


export type MutationUpdatePortfolioArgs = {
  data: UpdatePortfolioInput;
  uuid: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Portfolio = {
  __typename?: 'Portfolio';
  /** Portfolio name. */
  name: Scalars['String'];
  /** Portfolio uuid. */
  uuid: Scalars['ID'];
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
  uuid: Scalars['ID'];
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

export type ResetPassword = {
  __typename?: 'ResetPassword';
  /** Send reset password successful. */
  success: Scalars['Boolean'];
};

export type ResetPasswordInput = {
  /** Email. */
  email: Scalars['EmailAddress'];
  /** Token. */
  token: Scalars['String'];
};

export type SendCode = {
  __typename?: 'SendCode';
  /** Send code successful. */
  success: Scalars['Boolean'];
};

export type SendCodeInput = {
  /** Email. */
  email: Scalars['EmailAddress'];
  /** Token. */
  token: Scalars['String'];
};

export type SetNewPassword = {
  __typename?: 'SetNewPassword';
  /** Name of the user. */
  success: Scalars['Boolean'];
};

export type SetNewPasswordInput = {
  /** Password. */
  password: Scalars['String'];
  /** Reset token. */
  resetToken: Scalars['String'];
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

export type SigninLocal = {
  __typename?: 'SigninLocal';
  /** Signin local successful. */
  success: Scalars['Boolean'];
};

export type SignupInput = {
  /** Email. */
  email: Scalars['EmailAddress'];
  /** Name. */
  name: Scalars['String'];
  /** Password. */
  password: Scalars['String'];
  /** Token. */
  token: Scalars['String'];
};

export type SignupLocal = {
  __typename?: 'SignupLocal';
  /** Signup local successful. */
  success: Scalars['Boolean'];
};

export type UpdateCashAccountInput = {
  /** Account balance. */
  balance?: InputMaybe<Scalars['Float']>;
  /** Cash account currency. */
  currency?: InputMaybe<Currency>;
  /** Cash account name. */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdatePortfolioInput = {
  /** Portfolio name. */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  /** New user default currency. */
  defaultCurrency?: InputMaybe<Currency>;
  /** New user email. */
  email?: InputMaybe<Scalars['EmailAddress']>;
  /** New user name. */
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** User date created. */
  createdAt: Scalars['Date'];
  /** User default currency. */
  defaultCurrency: Currency;
  /** User email. */
  email: Scalars['EmailAddress'];
  /** User introduction step. */
  introductionStep: IntroductionStep;
  /** User name. */
  name: Scalars['String'];
  /** User uuid. */
  uuid: Scalars['ID'];
};

export type ConfirmSignupMutationVariables = Exact<{
  data: ConfirmSignupInput;
}>;


export type ConfirmSignupMutation = { __typename?: 'Mutation', confirmSignup: { __typename?: 'ConfirmSignup', success: boolean } };

export type CreateCashAccountMutationVariables = Exact<{
  data: CreateCashAccountInput;
}>;


export type CreateCashAccountMutation = { __typename?: 'Mutation', createCashAccount: { __typename?: 'CashAccount', uuid: string, name: string, currency: Currency, balance: number } };

export type DeleteCashAccountMutationVariables = Exact<{
  uuid: Scalars['ID'];
}>;


export type DeleteCashAccountMutation = { __typename?: 'Mutation', deleteCashAccount: { __typename?: 'CashAccount', uuid: string, name: string, currency: Currency } };

export type IntroductionCreatePortfoliosMutationVariables = Exact<{
  data: IntroductionCreatePortfoliosInput;
}>;


export type IntroductionCreatePortfoliosMutation = { __typename?: 'Mutation', introductionCreatePortfolios: { __typename?: 'IntroductionPortfolios', success: boolean } };

export type IntroductionCreateCashAccountsMutationVariables = Exact<{
  data: IntroductionCreateCashAccountsInput;
}>;


export type IntroductionCreateCashAccountsMutation = { __typename?: 'Mutation', introductionCreateCashAccounts: { __typename?: 'IntroductionCashAccounts', success: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'Logout', success: boolean } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Refresh', success: boolean } };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPassword', success: boolean } };

export type SendCodeMutationVariables = Exact<{
  data: SendCodeInput;
}>;


export type SendCodeMutation = { __typename?: 'Mutation', sendCode: { __typename?: 'SendCode', success: boolean } };

export type SetNewPasswordMutationVariables = Exact<{
  data: SetNewPasswordInput;
}>;


export type SetNewPasswordMutation = { __typename?: 'Mutation', setNewPassword: { __typename?: 'SetNewPassword', success: boolean } };

export type SigninMutationVariables = Exact<{
  data: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signinLocal: { __typename?: 'SigninLocal', success: boolean } };

export type SignupMutationVariables = Exact<{
  data: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signupLocal: { __typename?: 'SignupLocal', success: boolean } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', uuid: string, name: string, email: any, createdAt: any, introductionStep: IntroductionStep, defaultCurrency: Currency } };

export type EmailExistQueryVariables = Exact<{
  data: EmailInput;
}>;


export type EmailExistQuery = { __typename?: 'Query', emailExist: { __typename?: 'Email', exist: boolean } };

export type GetCashAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCashAccountQuery = { __typename?: 'Query', cashAccounts: Array<{ __typename?: 'CashAccount', uuid: string, name: string, currency: Currency, balance: number, history: Array<{ __typename?: 'CashAccountHistory', date: any, balance: number }> }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', uuid: string, name: string, email: any, createdAt: any, introductionStep: IntroductionStep, defaultCurrency: Currency } };


export const ConfirmSignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmSignup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmSignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmSignup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ConfirmSignupMutation, ConfirmSignupMutationVariables>;
export const CreateCashAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCashAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCashAccountInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCashAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<CreateCashAccountMutation, CreateCashAccountMutationVariables>;
export const DeleteCashAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCashAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCashAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]} as unknown as DocumentNode<DeleteCashAccountMutation, DeleteCashAccountMutationVariables>;
export const IntroductionCreatePortfoliosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IntroductionCreatePortfolios"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntroductionCreatePortfoliosInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"introductionCreatePortfolios"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<IntroductionCreatePortfoliosMutation, IntroductionCreatePortfoliosMutationVariables>;
export const IntroductionCreateCashAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IntroductionCreateCashAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IntroductionCreateCashAccountsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"introductionCreateCashAccounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<IntroductionCreateCashAccountsMutation, IntroductionCreateCashAccountsMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendCodeMutation, SendCodeMutationVariables>;
export const SetNewPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetNewPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetNewPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setNewPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SetNewPasswordMutation, SetNewPasswordMutationVariables>;
export const SigninDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SigninInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signinLocal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SigninMutation, SigninMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupLocal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"introductionStep"}},{"kind":"Field","name":{"kind":"Name","value":"defaultCurrency"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const EmailExistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailExist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailExist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exist"}}]}}]}}]} as unknown as DocumentNode<EmailExistQuery, EmailExistQueryVariables>;
export const GetCashAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCashAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cashAccounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"history"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"30"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]} as unknown as DocumentNode<GetCashAccountQuery, GetCashAccountQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"introductionStep"}},{"kind":"Field","name":{"kind":"Name","value":"defaultCurrency"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
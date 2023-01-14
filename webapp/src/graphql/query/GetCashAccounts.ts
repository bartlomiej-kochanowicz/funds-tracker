import { gql } from '__generated__';

export const GET_CASH_ACCOUNTS = gql(/* GraphQL */ `
  query GetCashAccount {
    cashAccounts {
      uuid
      name
      currency
      balance
      history(first: 30) {
        date
        balance
      }
    }
  }
`);

export const GET_CASH_ACCOUNTS_INTRODUCTION = gql(/* GraphQL */ `
  query GetCashAccountIntroduction {
    cashAccounts {
      uuid
      name
      currency
    }
  }
`);

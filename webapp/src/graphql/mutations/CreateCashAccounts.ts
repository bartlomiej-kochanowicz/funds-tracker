import { gql } from '__generated__';

export const CREATE_CASH_ACCOUNTS = gql(/* GraphQL */ `
  mutation CreateCashAccounts($data: CreateCashAccountsInput!) {
    createCashAccounts(data: $data) {
      success
    }
  }
`);

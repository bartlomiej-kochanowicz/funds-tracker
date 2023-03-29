import { gql } from '__generated__';

export const ADD_FUNDS_TO_CASH_ACCOUNT = gql(/* GraphQL */ `
  mutation AddFundsToCashAccount($data: AddFundsToCashAccountInput!) {
    addFundsToCashAccount(data: $data) {
      balance
    }
  }
`);

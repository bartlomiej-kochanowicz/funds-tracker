import { gql } from '__generated__';

export const GET_CASH_ACCOUNT_OPERATIONS = gql(/* GraphQL */ `
  query GetCashAccountOperations($uuid: ID!) {
    cashAccount(uuid: $uuid) {
      operations {
        uuid
        type
        amount
        date
      }
    }
  }
`);

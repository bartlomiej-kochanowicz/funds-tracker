import { gql } from '__generated__';

export const DELETE_CASH_ACCOUNT = gql(/* GraphQL */ `
  mutation DeleteCashAccount($uuid: ID!) {
    deleteCashAccount(uuid: $uuid) {
      success
    }
  }
`);

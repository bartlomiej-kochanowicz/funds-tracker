import { gql } from '__generated__';

export const UPDATE_CASH_ACCOUNT = gql(/* GraphQL */ `
  mutation UpdateCashAccount($uuid: ID!, $data: UpdateCashAccountInput!) {
    updateCashAccount(uuid: $uuid, data: $data) {
      uuid
      name
    }
  }
`);

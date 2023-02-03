import { gql } from '__generated__';

export const CHECK_RESET_TOKEN = gql(/* GraphQL */ `
  query CheckResetToken($data: CheckResetTokenInput!) {
    checkResetToken(data: $data) {
      name
    }
  }
`);

import { gql } from '__generated__';

export const RESET_PASSWORD = gql(/* GraphQL */ `
  mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
      success
    }
  }
`);

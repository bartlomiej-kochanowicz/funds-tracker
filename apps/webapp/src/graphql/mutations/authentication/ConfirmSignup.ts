import { gql } from '__generated__';

export const CONFIRM_SIGNUP = gql(/* GraphQL */ `
  mutation ConfirmSignup($data: ConfirmSignupInput!) {
    confirmSignup(data: $data) {
      success
    }
  }
`);

import { gql } from '__generated__';

export const SIGNIN = gql(/* GraphQL */ `
  mutation Signin($data: SigninInput!) {
    signinLocal(data: $data) {
      uuid
      name
    }
  }
`);

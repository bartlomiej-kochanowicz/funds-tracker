import { gql } from '__generated__';

export const Signin = gql(/* GraphQL */ `
  mutation Signin($data: SigninInput!) {
    signinLocal(data: $data) {
      uuid
      name
    }
  }
`);

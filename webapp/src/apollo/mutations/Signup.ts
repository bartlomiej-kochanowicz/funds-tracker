import { gql } from '__generated__';

export const Signup = gql(/* GraphQL */ `
  mutation Signup($data: SignupInput!) {
    signupLocal(data: $data) {
      uuid
      name
    }
  }
`);

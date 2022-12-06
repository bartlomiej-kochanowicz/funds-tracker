import { gql } from '__generated__/gql';

export const GetUser = gql(/* GraphQL */ `
  query GetUser {
    user {
      uuid
      name
      email
      createdAt
    }
  }
`);

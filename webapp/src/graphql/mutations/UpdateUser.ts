import { gql } from '__generated__';

export const UPDATE_USER = gql(/* GraphQL */ `
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      uuid
      name
      email
      createdAt
      introductionStep
      defaultCurrency
    }
  }
`);

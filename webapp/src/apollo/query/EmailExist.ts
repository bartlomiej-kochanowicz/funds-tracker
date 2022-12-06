import { gql } from '__generated__';

export const EmailExist = gql(/* GraphQL */ `
  query EmailExist($data: EmailInput!) {
    emailExist(data: $data) {
      exist
    }
  }
`);

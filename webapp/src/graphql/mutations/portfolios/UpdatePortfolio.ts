import { gql } from '__generated__';

export const UPDATE_PORTFOLIO = gql(/* GraphQL */ `
  mutation UpdatePortfolio($uuid: String!, $name: String!) {
    updatePortfolio(uuid: $uuid, data: { name: $name }) {
      uuid
      name
    }
  }
`);

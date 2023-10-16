import { gql } from '__generated__';

export const DELETE_PORTFOLIO = gql(/* GraphQL */ `
  mutation DeletePortfolio($uuid: String!) {
    deletePortfolio(uuid: $uuid) {
      success
    }
  }
`);

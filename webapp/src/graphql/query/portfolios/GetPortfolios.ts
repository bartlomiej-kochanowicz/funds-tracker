import { gql } from '__generated__';

export const GET_PORTFOLIOS = gql(/* GraphQL */ `
  query GetPortfolios {
    portfolios {
      uuid
      name
    }
  }
`);

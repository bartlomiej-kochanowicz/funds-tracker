import { gql } from '__generated__';

export const CREATE_PORTFOLIO = gql(/* GraphQL */ `
  mutation CreatePortfolio($data: CreatePortfolioInput!) {
    createPortfolio(data: $data) {
      uuid
      name
    }
  }
`);

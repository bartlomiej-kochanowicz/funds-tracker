import { gql } from '__generated__';

export const SEARCH_INSTRUMENTS = gql(/* GraphQL */ `
  query SearchInstruments($data: SearchInstrumentsInput!) {
    searchInstruments(data: $data) {
      Code
      Exchange
      Name
      Type
      Country
      Currency
      ISIN
      previousClose
    }
  }
`);

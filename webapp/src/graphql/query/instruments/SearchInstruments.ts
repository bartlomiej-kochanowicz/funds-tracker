import { gql } from '__generated__';

export const SEARCH_INSTRUMENTS = gql(/* GraphQL */ `
  query SearchInstruments($data: SearchInstrumentsInput!) {
    searchInstruments(data: $data) {
      quoteType
      symbol
      longname
      exchange
    }
  }
`);

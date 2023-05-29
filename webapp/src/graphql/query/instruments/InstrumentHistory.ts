import { gql } from '__generated__';

export const INSTRUMENT_HISTORY = gql(/* GraphQL */ `
  query GetInstrumentHistory($data: InstrumentHistoryInput!) {
    instrumentHistory(data: $data) {
      date
      open
      close
      high
      low
      volume
    }
  }
`);

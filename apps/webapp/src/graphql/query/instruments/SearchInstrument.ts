import { gql } from "__generated__";

export const SEARCH_INSTRUMENT = gql(/* GraphQL */ `
	query SearchInstrument($data: SearchInstrumentInput!) {
		searchInstrument(data: $data) {
			Code
			Exchange
			Name
			Type
			Country
			Currency
			ISIN
			previousClose
			previousCloseDate
		}
	}
`);

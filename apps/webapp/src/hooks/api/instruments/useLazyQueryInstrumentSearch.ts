import { gql } from "__generated__";
import { SearchInstrumentQuery, SearchInstrumentQueryVariables } from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";

const SEARCH_INSTRUMENT = gql(/* GraphQL */ `
	query SearchInstrument($data: SearchInstrumentInput!) {
		searchInstrument(data: $data) {
			symbol
			name
			currency
			stockExchange
			exchangeShortName
		}
	}
`);

export const useLazyQueryInstrumentSearch = () =>
	useLazyQuery<SearchInstrumentQuery, SearchInstrumentQueryVariables>(SEARCH_INSTRUMENT, {
		fetchPolicy: "network-only",
	});

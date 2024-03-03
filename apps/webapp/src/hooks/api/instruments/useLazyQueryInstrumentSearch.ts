import { SearchInstrumentQuery, SearchInstrumentQueryVariables } from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_INSTRUMENT } from "graphql/query/instruments/SearchInstrument";

export const useLazyQueryInstrumentSearch = () =>
	useLazyQuery<SearchInstrumentQuery, SearchInstrumentQueryVariables>(SEARCH_INSTRUMENT, {
		fetchPolicy: "network-only",
	});

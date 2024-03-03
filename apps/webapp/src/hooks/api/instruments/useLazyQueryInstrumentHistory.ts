import { gql } from "__generated__";
import {
	GetInstrumentHistoryQuery,
	GetInstrumentHistoryQueryVariables,
} from "__generated__/graphql";
import { LazyQueryHookOptions, NoInfer, useLazyQuery } from "@apollo/client";

const INSTRUMENT_HISTORY = gql(/* GraphQL */ `
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

export const useLazyQueryInstrumentHistory = (
	options?: LazyQueryHookOptions<
		NoInfer<GetInstrumentHistoryQuery>,
		NoInfer<GetInstrumentHistoryQueryVariables>
	>,
) =>
	useLazyQuery<GetInstrumentHistoryQuery, GetInstrumentHistoryQueryVariables>(
		INSTRUMENT_HISTORY,
		options,
	);

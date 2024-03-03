import {
	GetInstrumentHistoryQuery,
	GetInstrumentHistoryQueryVariables,
} from "__generated__/graphql";
import { LazyQueryHookOptions, NoInfer, useLazyQuery } from "@apollo/client";
import { INSTRUMENT_HISTORY } from "graphql/query/instruments/InstrumentHistory";

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

import { useBackgroundQuery } from "@apollo/client";

import { GET_PORTFOLIO } from "./useSuspenseQueryPortfolio";

export const useBackgroundQueryPortfolio = (uuid: string) =>
	useBackgroundQuery(GET_PORTFOLIO, {
		variables: {
			uuid,
		},
	});

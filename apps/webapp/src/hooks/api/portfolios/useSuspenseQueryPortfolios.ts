import { GetPortfoliosQuery } from "__generated__/graphql";
import { useSuspenseQuery } from "@apollo/client";
import { GET_PORTFOLIOS } from "graphql/query/portfolios/GetPortfolios";

export const useSuspenseQueryPortfolios = () =>
	useSuspenseQuery<GetPortfoliosQuery>(GET_PORTFOLIOS);

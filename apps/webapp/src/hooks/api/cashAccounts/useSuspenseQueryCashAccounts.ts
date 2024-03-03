import { GetCashAccountsQuery } from "__generated__/graphql";
import { useSuspenseQuery } from "@apollo/client";
import { GET_CASH_ACCOUNTS } from "graphql/query/cashAccounts/GetCashAccounts";

export const useSuspenseQueryCashAccounts = () =>
	useSuspenseQuery<GetCashAccountsQuery>(GET_CASH_ACCOUNTS);

import { CreateCashAccountMutation, GetCashAccountsQuery } from "__generated__/graphql";
import { useQuery } from "@apollo/client";
import { Panel, Text } from "@faunds-tracker/ui";
import { Heading, Loader, Spacer } from "components/atoms";
import { ErrorContent } from "components/molecules";
import { MAX_CASH_ACCOUNTS } from "constants/common";
import { GET_CASH_ACCOUNTS } from "graphql/query/cashAccounts/GetCashAccounts";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { CashAccountsPanel } from "./components/CashAccountsPanel";
import { CreateCashAccount } from "./components/CreateCashAccount";
import { CreateFirstCashAccount } from "./components/CreateFirstCashAccount";

export const CashAccounts = () => {
	const { t } = useTranslation();

	const { loading, data, error, updateQuery } = useQuery<GetCashAccountsQuery>(GET_CASH_ACCOUNTS);

	const cashAccountsExist = Boolean(data && data.cashAccounts.length > 0);

	const renderCreateCashAccountButton = Boolean(
		data && data.cashAccounts.length < MAX_CASH_ACCOUNTS && data.cashAccounts.length > 0,
	);

	const addCashAccountToList = (newCashAccountData: CreateCashAccountMutation) => {
		updateQuery(prev => ({
			cashAccounts: [...prev.cashAccounts, newCashAccountData.createCashAccount],
		}));
	};

	const updateCashAccountBalance = ({ balance, uuid }: { balance: number; uuid: string }) => {
		updateQuery(prev => ({
			cashAccounts: prev.cashAccounts.map(cashAccount => {
				if (cashAccount.uuid === uuid) {
					return {
						...cashAccount,
						balance,
					};
				}

				return cashAccount;
			}),
		}));
	};

	const updateCashAccountName = ({ name, uuid }: { name: string; uuid: string }) => {
		updateQuery(prev => ({
			cashAccounts: prev.cashAccounts.map(cashAccount => {
				if (cashAccount.uuid === uuid) {
					return {
						...cashAccount,
						name,
					};
				}

				return cashAccount;
			}),
		}));
	};

	const updateCashAccountList = ({ uuid }: { uuid: string }) => {
		updateQuery(prev => ({
			cashAccounts: prev.cashAccounts.filter(cashAccount => cashAccount.uuid !== uuid),
		}));
	};

	return (
		<Fragment>
			<Heading>{t("navigation.cash_accounts")}</Heading>

			<Text className="text-sm text-gray-400">{t("page.cash_accounts.title.description")}</Text>

			<Spacer />

			{loading && <Loader $size="large" />}

			{!loading && error && <ErrorContent />}

			{!loading && !cashAccountsExist && !error && (
				<CreateFirstCashAccount callback={addCashAccountToList} />
			)}

			{!loading && cashAccountsExist && !error && (
				<Panel>
					{data?.cashAccounts.map(({ uuid, ...rest }) => (
						<CashAccountsPanel
							key={uuid}
							uuid={uuid}
							updateCashAccountBalance={updateCashAccountBalance}
							updateCashAccountName={updateCashAccountName}
							updateCashAccountList={updateCashAccountList}
							{...rest}
						/>
					))}
				</Panel>
			)}

			<Spacer />

			{renderCreateCashAccountButton && <CreateCashAccount callback={addCashAccountToList} />}
		</Fragment>
	);
};

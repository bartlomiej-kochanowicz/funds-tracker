import { Badge, Card, Table } from "@funds-tracker/ui";
import { formatCurrency } from "helpers/formatCurrency";
import { formatDate } from "helpers/formatDate";
import { useSuspenseQueryPortfolio } from "hooks/api/portfolios/useSuspenseQueryPortfolio";
import { ArrowDownCircle } from "lucide-react";
import { Fragment, Suspense } from "react";
import { useTranslation } from "react-i18next";

type TransactionsTableProps = {
	uuid: string;
};

export const TransactionsTable = ({ uuid }: TransactionsTableProps) => {
	const { t } = useTranslation();

	const { data } = useSuspenseQueryPortfolio(uuid);

	return (
		<Suspense>
			<Card>
				<Card.Content>
					<Table>
						<Table.Caption>{t("page.portfolio.table.caption")}</Table.Caption>
						<Table.Header>
							<Table.Row>
								<Table.Head>{t("common.ticker")}</Table.Head>
								<Table.Head>{t("common.operation")}</Table.Head>
								<Table.Head>{t("common.instrument")}</Table.Head>
								<Table.Head>{t("common.price")}</Table.Head>
								<Table.Head>{t("common.quantity")}</Table.Head>
								<Table.Head>{t("common.purchase_date")}</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{data?.portfolio.transactions.map(
								({
									uuid,
									instrument: { symbol, name, currency },
									price,
									quantity,
									date,
									type,
								}) => (
									<Table.Row key={uuid}>
										<Table.Cell>
											<Badge>{symbol.replace(".", ":")}</Badge>
										</Table.Cell>
										<Table.Cell className="flex items-center gap-1">
											{type === "sell" && (
												<Fragment>
													<ArrowDownCircle className="size-4 text-destructive" />
													{t("common.operation.sell")}
												</Fragment>
											)}
											{type === "buy" && (
												<Fragment>
													<ArrowDownCircle className="size-4 rotate-180" />
													{t("common.operation.buy")}
												</Fragment>
											)}
										</Table.Cell>
										<Table.Cell>{name}</Table.Cell>
										<Table.Cell>{formatCurrency(price, currency)}</Table.Cell>
										<Table.Cell>{quantity}</Table.Cell>
										<Table.Cell>{formatDate(date, { withTime: false })}</Table.Cell>
									</Table.Row>
								),
							)}
						</Table.Body>
					</Table>
				</Card.Content>
			</Card>
		</Suspense>
	);
};

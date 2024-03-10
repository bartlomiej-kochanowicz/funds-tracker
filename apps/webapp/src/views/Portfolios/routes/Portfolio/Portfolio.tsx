import { Badge, Card, H1, Table } from "@funds-tracker/ui";
import { formatDate } from "helpers/formatDate";
import { useSuspenseQueryPortfolio } from "hooks/api/portfolios/useSuspenseQueryPortfolio";
import { ArrowDownCircle } from "lucide-react";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

export const Portfolio = () => {
	const { uuid } = useParams<{ uuid: string }>();

	if (!uuid) {
		return null;
	}

	const { data } = useSuspenseQueryPortfolio(uuid);

	return (
		<Suspense>
			<H1 className="mb-4">{data.portfolio.name}</H1>
			<Card>
				<Card.Content>
					<Table>
						<Table.Caption>Tabela transakcji</Table.Caption>
						<Table.Header>
							<Table.Row>
								<Table.Head>Ticker</Table.Head>
								<Table.Head>Typ</Table.Head>
								<Table.Head>Nazwa</Table.Head>
								<Table.Head>Cena</Table.Head>
								<Table.Head>Ilość</Table.Head>
								<Table.Head>Data zakupu</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{data?.portfolio.transactions.map(
								({ uuid, instrument: { codeExchange, name }, price, quantity, date, type }) => (
									<Table.Row key={uuid}>
										<Table.Cell>
											<Badge>{codeExchange.replace(".", ":")}</Badge>
										</Table.Cell>
										<Table.Cell>
											{type === "sell" && <ArrowDownCircle className="size-4 text-destructive" />}
											{type === "buy" && <ArrowDownCircle className="size-4 rotate-180" />}
										</Table.Cell>
										<Table.Cell>{name}</Table.Cell>
										<Table.Cell>{price}</Table.Cell>
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

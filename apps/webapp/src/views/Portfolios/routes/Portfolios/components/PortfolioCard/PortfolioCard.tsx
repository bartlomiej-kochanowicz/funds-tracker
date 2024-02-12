import { GetPortfoliosQuery } from "__generated__/graphql";
import { Button, Card, DropdownMenu } from "@funds-tracker/ui";
import clsx from "clsx";
import { useConfirmDeletePortfolioDialog } from "components/dialogs/ConfirmDeletePortfolioDialog";
import { useRenamePortfolioDialog } from "components/dialogs/RenamePortfolioDialog";
import { MoreVertical, Pencil, PieChart, Trash2 } from "lucide-react";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

type PortfolioCardProps = {
	isPending: boolean;
	handleRefetch: () => void;
} & GetPortfoliosQuery["portfolios"][0];

export const PortfolioCard = ({ name, isPending, uuid, handleRefetch }: PortfolioCardProps) => {
	const { t } = useTranslation();

	const { open: openConfirmDeletePortfolioDialog, dialog: ConfirmDeletePortfolioDialog } =
		useConfirmDeletePortfolioDialog({ uuid, name, handleRefetch });

	const { open: openRenamePortfolioDialog, dialog: RenamePortfolioDialog } =
		useRenamePortfolioDialog({ uuid, name, handleRefetch });

	const items = useMemo(
		() => [
			[
				{
					icon: PieChart,
					label: t("common.manage"),
				},
			],
			[
				{
					icon: Pencil,
					label: t("common.rename"),
					onSelect: openRenamePortfolioDialog,
				},
				{
					icon: Trash2,
					label: t("common.delete"),
					onSelect: openConfirmDeletePortfolioDialog,
				},
			],
		],
		[],
	);

	const groupQuantity = items.length;

	return (
		<Fragment>
			{ConfirmDeletePortfolioDialog}
			{RenamePortfolioDialog}

			<Card
				className={clsx(
					"flex justify-between",
					isPending && "pointer-events-auto cursor-not-allowed opacity-50",
				)}
			>
				<Card.Header className="w-full">
					<div className="flex items-center justify-between">
						<div>
							<Card.Title>{name}</Card.Title>
							{/* <Card.Description>{formatCurrency(balance, currency)}</Card.Description> */}
						</div>
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<Button
									variant="outline"
									size="icon"
								>
									<MoreVertical />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								{items.map((group, index) => (
									<Fragment key={index}>
										<DropdownMenu.Group>
											{group.map(({ icon: Icon, label, ...rest }) => {
												return (
													<DropdownMenu.Item
														key={label}
														onSelect={rest.onSelect}
													>
														<Icon className="mr-2 size-4" />

														<span>{label}</span>
													</DropdownMenu.Item>
												);
											})}
										</DropdownMenu.Group>

										{groupQuantity !== index + 1 && <DropdownMenu.Separator />}
									</Fragment>
								))}
							</DropdownMenu.Content>
						</DropdownMenu>
					</div>
				</Card.Header>
			</Card>
		</Fragment>
	);
};

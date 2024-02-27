import { Currency } from "__generated__/graphql";
import { responsiveDialog } from "@funds-tracker/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsForm } from "./CashAccountInvestFundsForm";

type UseCashAccountInvestFundsDialogProps = {
	handleRefetch: () => void;
	balance: number;
	currency: Currency;
	uuid: string;
};

export const useCashAccountInvestFundsDialog = ({
	balance,
	currency,
	uuid,
}: UseCashAccountInvestFundsDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const ResponsiveDialog = responsiveDialog();

	return {
		open: handleOpen,
		dialog: (
			<ResponsiveDialog
				open={open}
				onOpenChange={setOpen}
			>
				<ResponsiveDialog.Content className="px-4 py-6">
					<ResponsiveDialog.Header>
						<ResponsiveDialog.Title>
							{t("modal.CashAccountInvestFunds.name")}
						</ResponsiveDialog.Title>
						<ResponsiveDialog.Description>
							{t("modal.InvestFunds.description")}
						</ResponsiveDialog.Description>
					</ResponsiveDialog.Header>

					<CashAccountInvestFundsForm
						balance={balance}
						currency={currency}
						uuid={uuid}
					/>
				</ResponsiveDialog.Content>
			</ResponsiveDialog>
		),
	};
};

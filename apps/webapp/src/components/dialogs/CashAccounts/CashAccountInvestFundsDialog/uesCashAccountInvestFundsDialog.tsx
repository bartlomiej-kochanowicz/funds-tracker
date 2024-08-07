import { responsiveDialog } from "@funds-tracker/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsForm } from "./CashAccountInvestFundsForm";

type UseCashAccountInvestFundsDialogProps = {
	handleRefetch: () => void;
	balance: number;
	currency: string;
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
				<ResponsiveDialog.Content className="md:px-4 md:py-6">
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
						setOpen={setOpen}
					/>
				</ResponsiveDialog.Content>
			</ResponsiveDialog>
		),
	};
};

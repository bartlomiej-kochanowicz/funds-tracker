import { Currency } from "__generated__/graphql";
import { Dialog } from "@funds-tracker/ui";
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

	return {
		open: handleOpen,
		dialog: (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<Dialog.Content className="px-4 py-6">
					<Dialog.Header>
						<Dialog.Title>{t("modal.CashAccountInvestFunds.name")}</Dialog.Title>
						<Dialog.Description>{t("modal.InvestFunds.description")}</Dialog.Description>
					</Dialog.Header>

					<CashAccountInvestFundsForm
						balance={balance}
						currency={currency}
						uuid={uuid}
					/>
				</Dialog.Content>
			</Dialog>
		),
	};
};

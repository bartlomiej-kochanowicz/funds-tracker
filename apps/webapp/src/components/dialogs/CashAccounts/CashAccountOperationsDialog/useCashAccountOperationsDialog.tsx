import { Currency } from "__generated__/graphql";
import { Dialog } from "@funds-tracker/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { OperationsTable } from "./components/OperationsTable/OperationsTable";

type UseCashAccountOperationsDialogProps = {
	uuid: string;
	currency: Currency;
};

export const useCashAccountOperationsDialog = ({
	uuid,
	currency,
}: UseCashAccountOperationsDialogProps) => {
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
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>{t("modal.CashAccountOperations.name")}</Dialog.Title>
						<Dialog.Description>{t("modal.CashAccountOperations.description")}</Dialog.Description>
					</Dialog.Header>
					<OperationsTable
						uuid={uuid}
						currency={currency}
					/>
				</Dialog.Content>
			</Dialog>
		),
	};
};

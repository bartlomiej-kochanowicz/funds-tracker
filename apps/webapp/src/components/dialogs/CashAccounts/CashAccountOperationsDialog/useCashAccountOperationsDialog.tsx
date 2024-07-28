import { responsiveDialog } from "@funds-tracker/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { OperationsTable } from "./components/OperationsTable/OperationsTable";

type UseCashAccountOperationsDialogProps = {
	uuid: string;
	currency: string;
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

	const ResponsiveDialog = responsiveDialog();

	return {
		open: handleOpen,
		dialog: (
			<ResponsiveDialog
				open={open}
				onOpenChange={setOpen}
			>
				<ResponsiveDialog.Content>
					<ResponsiveDialog.Header>
						<ResponsiveDialog.Title>{t("modal.CashAccountOperations.name")}</ResponsiveDialog.Title>
						<ResponsiveDialog.Description>
							{t("modal.CashAccountOperations.description")}
						</ResponsiveDialog.Description>
					</ResponsiveDialog.Header>
					<OperationsTable
						uuid={uuid}
						currency={currency}
					/>
				</ResponsiveDialog.Content>
			</ResponsiveDialog>
		),
	};
};

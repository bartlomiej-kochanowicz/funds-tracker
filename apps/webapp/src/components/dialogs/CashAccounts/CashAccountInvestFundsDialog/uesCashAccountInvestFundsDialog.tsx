import { Dialog } from "@funds-tracker/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type UseCashAccountInvestFundsDialogProps = {
	handleRefetch: () => void;
	name: string;
	uuid: string;
};

export const useCashAccountInvestFundsDialog = (props: UseCashAccountInvestFundsDialogProps) => {
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
						<Dialog.Title>{t("modal.CashAccountInvestFunds.name")}</Dialog.Title>
						<Dialog.Description>{t("modal.InvestFunds.description")}</Dialog.Description>
					</Dialog.Header>
					form
					{/* <Dialog.Footer>
						<Dialog.Close asChild>
							<Button
								variant="secondary"
								className="w-1/2"
							>
								{t("common.cancel")}
							</Button>
						</Dialog.Close>

						<Button
							className="flex w-1/2 items-center justify-center gap-2"
							disabled={loading}
							onClick={handleDelete}
							variant="destructive"
						>
							{loading ? <Loader /> : <Trash className="size-4" />}

							{t("common.delete")}
						</Button>
					</Dialog.Footer> */}
				</Dialog.Content>
			</Dialog>
		),
	};
};

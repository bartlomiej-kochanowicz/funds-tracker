import {
	Button,
	emitErrorToast,
	emitSuccessToast,
	Loader,
	responsiveDialog,
	Text,
} from "@funds-tracker/ui";
import { useMutationCashAccountDelete } from "hooks/api/cashAccounts/useMutationCashAccountDelete";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type UseCashAccountConfirmDeleteDialogProps = {
	handleRefetch: () => void;
	name: string;
	uuid: string;
};

export const useCashAccountConfirmDeleteDialog = ({
	handleRefetch,
	name,
	uuid,
}: UseCashAccountConfirmDeleteDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const [cashAccountDelete, { loading }] = useMutationCashAccountDelete({
		onCompleted: () => {
			emitSuccessToast(t("modal.CashAccountConfirmDelete.toast.success"));
			handleRefetch();
			setOpen(false);
		},
		onError: () => {
			emitErrorToast(t("modal.CashAccountConfirmDelete.toast.failure"));
		},
	});

	const handleDelete = async () => {
		await cashAccountDelete({
			variables: {
				uuid,
			},
		});
	};
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
						<ResponsiveDialog.Title>
							{t("modal.CashAccountConfirmDelete.name")}
						</ResponsiveDialog.Title>
						<ResponsiveDialog.Description>
							<Trans
								i18nKey="modal.CashAccountConfirmDelete.description"
								values={{ name }}
								components={{
									bold: (
										<Text
											muted
											className="font-bold"
										/>
									),
								}}
							/>
						</ResponsiveDialog.Description>
					</ResponsiveDialog.Header>
					<ResponsiveDialog.Footer>
						<ResponsiveDialog.Close asChild>
							<Button
								variant="secondary"
								className="md:w-1/2"
							>
								{t("common.cancel")}
							</Button>
						</ResponsiveDialog.Close>

						<Button
							className="flex items-center justify-center gap-2 md:w-1/2"
							disabled={loading}
							onClick={handleDelete}
							variant="destructive"
						>
							{loading ? <Loader /> : <Trash className="size-4" />}

							{t("common.delete")}
						</Button>
					</ResponsiveDialog.Footer>
				</ResponsiveDialog.Content>
			</ResponsiveDialog>
		),
	};
};

import {
	DeleteCashAccountMutation,
	DeleteCashAccountMutationVariables,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Dialog, Loader, Text } from "@funds-tracker/ui";
import { DELETE_CASH_ACCOUNT } from "graphql/mutations/cashAccounts/DeleteCashAccount";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type UseConfirmDeleteCashAccountDialogProps = {
	handleRefetch: () => void;
	name: string;
	uuid: string;
};

export const useConfirmDeleteCashAccountDialog = ({
	handleRefetch,
	name,
	uuid,
}: UseConfirmDeleteCashAccountDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const [deleteCashAccount, { loading }] = useMutation<
		DeleteCashAccountMutation,
		DeleteCashAccountMutationVariables
	>(DELETE_CASH_ACCOUNT, {
		onCompleted: () => {
			showSuccessToast(t("modal.ConfirmDeleteCashAccount.toast.success"));

			handleRefetch();
			setOpen(false);
		},
		onError: () => {
			showErrorToast(t("modal.ConfirmDeleteCashAccount.toast.failure"));
		},
	});

	const handleDelete = async () => {
		await deleteCashAccount({
			variables: {
				uuid,
			},
		});
	};

	return {
		open: handleOpen,
		dialog: () => (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>{t("modal.ConfirmDeleteCashAccount.name")}</Dialog.Title>
						<Dialog.Description>
							<Trans
								i18nKey="modal.ConfirmDeleteCashAccount.description"
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
						</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer>
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
							{loading ? <Loader /> : <Trash className="size-6" />}

							{t("common.delete")}
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog>
		),
	};
};

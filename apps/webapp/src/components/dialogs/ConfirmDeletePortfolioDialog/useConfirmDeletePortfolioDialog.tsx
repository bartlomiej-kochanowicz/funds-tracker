import { DeletePortfolioMutation, DeletePortfolioMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Dialog, emitErrorToast, emitSuccessToast, Loader, Text } from "@funds-tracker/ui";
import { DELETE_PORTFOLIO } from "graphql/mutations/portfolios/DeletePortfolio";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type UseConfirmDeletePortfolioDialogProps = {
	handleRefetch: () => void;
	name: string;
	uuid: string;
};

export const useConfirmDeletePortfolioDialog = ({
	handleRefetch,
	name,
	uuid,
}: UseConfirmDeletePortfolioDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const [deletePortfolio, { loading }] = useMutation<
		DeletePortfolioMutation,
		DeletePortfolioMutationVariables
	>(DELETE_PORTFOLIO, {
		onCompleted: () => {
			emitSuccessToast(t("modal.ConfirmDeletePortfolio.toast.success"));
			handleRefetch();
			setOpen(false);
		},
		onError: () => {
			emitErrorToast(t("modal.ConfirmDeletePortfolio.toast.failure"));
		},
	});

	const handleDelete = async () => {
		await deletePortfolio({
			variables: {
				uuid,
			},
		});
	};

	return {
		open: handleOpen,
		dialog: (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>{t("modal.ConfirmDeletePortfolio.name")}</Dialog.Title>
						<Dialog.Description>
							<Trans
								i18nKey="modal.ConfirmDeletePortfolio.description"
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
							{loading ? <Loader /> : <Trash className="size-4" />}

							{t("common.delete")}
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog>
		),
	};
};

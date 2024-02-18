import { PortfolioDeleteMutation, PortfolioDeleteMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Dialog, emitErrorToast, emitSuccessToast, Loader, Text } from "@funds-tracker/ui";
import { PORTFOLIO_DELETE } from "graphql/mutations/portfolios/PortfolioDelete";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type UsePortfolioConfirmDeleteDialogProps = {
	handleRefetch: () => void;
	name: string;
	uuid: string;
};

export const usePortfolioConfirmDeleteDialog = ({
	handleRefetch,
	name,
	uuid,
}: UsePortfolioConfirmDeleteDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const [portfolioDelete, { loading }] = useMutation<
		PortfolioDeleteMutation,
		PortfolioDeleteMutationVariables
	>(PORTFOLIO_DELETE, {
		onCompleted: () => {
			emitSuccessToast(t("modal.PortfolioConfirmDelete.toast.success"));
			handleRefetch();
			setOpen(false);
		},
		onError: () => {
			emitErrorToast(t("modal.PortfolioConfirmDelete.toast.failure"));
		},
	});

	const handleDelete = async () => {
		await portfolioDelete({
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
						<Dialog.Title>{t("modal.PortfolioConfirmDelete.name")}</Dialog.Title>
						<Dialog.Description>
							<Trans
								i18nKey="modal.PortfolioConfirmDelete.description"
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

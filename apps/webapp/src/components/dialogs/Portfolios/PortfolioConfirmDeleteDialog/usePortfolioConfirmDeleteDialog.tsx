import { PortfolioDeleteMutation, PortfolioDeleteMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import {
	Button,
	emitErrorToast,
	emitSuccessToast,
	Loader,
	responsiveDialog,
	Text,
} from "@funds-tracker/ui";
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
							{t("modal.PortfolioConfirmDelete.name")}
						</ResponsiveDialog.Title>
						<ResponsiveDialog.Description>
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
						</ResponsiveDialog.Description>
					</ResponsiveDialog.Header>
					<ResponsiveDialog.Footer>
						<ResponsiveDialog.Close asChild>
							<Button
								variant="secondary"
								className="w-1/2"
							>
								{t("common.cancel")}
							</Button>
						</ResponsiveDialog.Close>

						<Button
							className="flex w-1/2 items-center justify-center gap-2"
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

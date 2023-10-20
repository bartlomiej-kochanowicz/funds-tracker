import { DeletePortfolioMutation, DeletePortfolioMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Box, Button, Loader, Spacer, Spreader, Text } from "components/atoms";
import { Modal } from "components/molecules";
import { DELETE_PORTFOLIO } from "graphql/mutations/portfolios/DeletePortfolio";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { Trans, useTranslation } from "react-i18next";

export interface ConfirmDeletePortfolioProps {
	name: string;
	uuid: string;
	callback: (data: { uuid: string }) => void;
}

export const ConfirmDeletePortfolio = NiceModal.create<ConfirmDeletePortfolioProps>(
	({ name, uuid, callback }) => {
		const { t } = useTranslation();

		const modal = useModal();

		const [deletePortfolio, { loading }] = useMutation<
			DeletePortfolioMutation,
			DeletePortfolioMutationVariables
		>(DELETE_PORTFOLIO, {
			onCompleted: () => {
				showSuccessToast(t("modal.ConfirmDeletePortfolio.toast.success"));

				callback({ uuid });

				modal.remove();
			},
			onError: () => {
				showErrorToast(t("modal.ConfirmDeletePortfolio.toast.failure"));

				modal.remove();
			},
		});

		const handleDelete = async () => {
			await deletePortfolio({
				variables: {
					uuid,
				},
			});

			modal.remove();
		};

		return (
			<Modal
				closeModal={modal.remove}
				modalName={t("modal.ConfirmDeletePortfolio.name")}
			>
				<Box
					$flex
					$flexDirection="column"
				>
					<Text
						$fontSize="0.875"
						$fontColor="gray400"
					>
						<Trans
							i18nKey="modal.ConfirmDeletePortfolio.description"
							values={{ name }}
							components={{
								bold: (
									<Text
										$fontSize="0.875"
										$fontColor="gray400"
										$textAlign="center"
										$fontWeight="700"
									/>
								),
							}}
						/>
					</Text>

					<Spacer />

					<Box $flex>
						<Button
							$color="tertiary"
							onClick={modal.remove}
							$width="50%"
						>
							{t("common.no")}
						</Button>

						<Spreader $spread="0.5" />

						<Button
							$width="50%"
							disabled={loading}
							onClick={handleDelete}
						>
							{loading && <Loader $color="white" />}

							{!loading && t("common.yes")}
						</Button>
					</Box>
				</Box>
			</Modal>
		);
	},
);

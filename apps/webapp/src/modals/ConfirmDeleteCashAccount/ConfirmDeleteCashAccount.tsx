import {
	DeleteCashAccountMutation,
	DeleteCashAccountMutationVariables,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Loader, Spacer, Spreader } from "components/atoms";
import { Modal } from "components/molecules";
import { DELETE_CASH_ACCOUNT } from "graphql/mutations/cashAccounts/DeleteCashAccount";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { Trans, useTranslation } from "react-i18next";
import { Button, Text } from "ui";

export interface ConfirmDeleteCashAccountProps {
	name: string;
	uuid: string;
	callback: (data: { uuid: string }) => void;
}

export const ConfirmDeleteCashAccount = NiceModal.create<ConfirmDeleteCashAccountProps>(
	({ name, uuid, callback }) => {
		const { t } = useTranslation();

		const modal = useModal();

		const [deleteCashAccount, { loading }] = useMutation<
			DeleteCashAccountMutation,
			DeleteCashAccountMutationVariables
		>(DELETE_CASH_ACCOUNT, {
			onCompleted: () => {
				showSuccessToast(t("modal.ConfirmDeleteCashAccount.toast.success"));

				callback({ uuid });

				modal.remove();
			},
			onError: () => {
				showErrorToast(t("modal.ConfirmDeleteCashAccount.toast.failure"));

				modal.remove();
			},
		});

		const handleDelete = async () => {
			await deleteCashAccount({
				variables: {
					uuid,
				},
			});

			modal.remove();
		};

		return (
			<Modal
				closeModal={modal.remove}
				modalName={t("modal.ConfirmDeleteCashAccount.name")}
			>
				<div className="flex flex-col">
					<Text className="text-sm text-gray-600">
						<Trans
							i18nKey="modal.ConfirmDeleteCashAccount.description"
							values={{ name }}
							components={{
								bold: <Text className="text-center text-sm font-bold text-gray-600" />,
							}}
						/>
					</Text>

					<Spacer />

					<div className="flex">
						<Button
							className="w-1/2"
							color="gray"
							onClick={modal.remove}
						>
							{t("common.no")}
						</Button>

						<Spreader $spread="0.5" />

						<Button
							className="w-1/2"
							disabled={loading}
							onClick={handleDelete}
						>
							{loading && <Loader $color="white" />}

							{!loading && t("common.yes")}
						</Button>
					</div>
				</div>
			</Modal>
		);
	},
);

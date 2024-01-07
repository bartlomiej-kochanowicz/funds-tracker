/* import { CreateCashAccountMutation } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Text } from "@funds-tracker/ui";
import { Spacer } from "components/atoms";
import { Modal } from "components/molecules";
import { useTranslation } from "react-i18next";

import { CreateCashAccountForm } from "./CreateCashAccountForm";

export type CreateCashAccountProps = {
	callback: (data: CreateCashAccountMutation) => void;
};

export const CreateCashAccount = NiceModal.create<CreateCashAccountProps>(({ callback }) => {
	const { t } = useTranslation();

	const modal = useModal();

	return (
		<Modal
			modalName={t("modal.CreateCashAccount.name")}
			closeModal={modal.remove}
		>
			<Text className="block max-w-[300px] whitespace-normal text-center text-sm text-gray-400 sm:max-w-full">
				{t("modal.CreateCashAccount.description")}
			</Text>

			<Spacer $space="0.5" />

			<CreateCashAccountForm callback={callback} />
		</Modal>
	);
});
 */

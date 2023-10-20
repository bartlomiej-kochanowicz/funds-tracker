import { CreateCashAccountMutation } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Spacer, Text } from "components/atoms";
import { Modal } from "components/molecules";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";

import { CreateCashAccountForm } from "./CreateCashAccountForm";

export type CreateCashAccountProps = {
	callback: (data: CreateCashAccountMutation) => void;
};

export const CreateCashAccount = NiceModal.create<CreateCashAccountProps>(({ callback }) => {
	const { t } = useTranslation();

	const isPhone = useBreakpoint("tablet", "max");

	const modal = useModal();

	return (
		<Modal
			modalName={t("modal.CreateCashAccount.name")}
			closeModal={modal.remove}
		>
			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$display="block"
				$maxWidth={isPhone ? "300px" : "100%"}
				$breakLine
			>
				{t("modal.CreateCashAccount.description")}
			</Text>

			<Spacer $space="0.5" />

			<CreateCashAccountForm callback={callback} />
		</Modal>
	);
});

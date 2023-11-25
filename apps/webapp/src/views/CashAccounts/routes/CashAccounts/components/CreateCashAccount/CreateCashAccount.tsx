import { CreateCashAccountMutation } from "__generated__/graphql";
import NiceModal from "@ebay/nice-modal-react";
import { Heading, Spacer, Spreader } from "components/atoms";
import { Plus } from "lucide-react";
import { MODAL_CREATE_CASH_ACCOUNT } from "components/dialogs/CreateCashAccount";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "ui";

interface CreateCashAccountProps {
	callback: (data: CreateCashAccountMutation) => void;
}

export const CreateCashAccount: FC<CreateCashAccountProps> = ({ callback }) => {
	const { t } = useTranslation();

	const handleOpenModal = () => NiceModal.show(MODAL_CREATE_CASH_ACCOUNT, { callback });

	return (
		<div className="flex flex-col items-center">
			<Heading
				$textAlign="center"
				$level="h2"
			>
				{t("page.cash_accounts.need.more")}
			</Heading>

			<Spacer $space="0.5" />

			<Button
				onPress={handleOpenModal}
				/* $outline */
			>
				{t("page.cash_accounts.need.more.button")}

				<Spreader $spread="0.25" />

				<Plus />
			</Button>
		</div>
	);
};

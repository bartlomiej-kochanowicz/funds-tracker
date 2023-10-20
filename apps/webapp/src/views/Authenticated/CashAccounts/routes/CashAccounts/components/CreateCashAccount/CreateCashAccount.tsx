import { CreateCashAccountMutation } from "__generated__/graphql";
import NiceModal from "@ebay/nice-modal-react";
import { Box, Button, Heading, Icon, Spacer, Spreader } from "components/atoms";
import { MODAL_CREATE_CASH_ACCOUNT } from "modals/CreateCashAccount";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

interface CreateCashAccountProps {
	callback: (data: CreateCashAccountMutation) => void;
}

export const CreateCashAccount: FC<CreateCashAccountProps> = ({ callback }) => {
	const { t } = useTranslation();

	const handleOpenModal = () => NiceModal.show(MODAL_CREATE_CASH_ACCOUNT, { callback });

	return (
		<Box
			$flex
			$flexDirection="column"
			$alignItems="center"
		>
			<Heading
				$textAlign="center"
				$level="h2"
			>
				{t("page.cash_accounts.need.more")}
			</Heading>

			<Spacer $space="0.5" />

			<Button
				onClick={handleOpenModal}
				$outline
			>
				{t("page.cash_accounts.need.more.button")}

				<Spreader $spread="0.25" />

				<Icon icon={FaPlus} />
			</Button>
		</Box>
	);
};

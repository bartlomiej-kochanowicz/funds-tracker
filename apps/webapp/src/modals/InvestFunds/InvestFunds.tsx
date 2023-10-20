import { Currency } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Spacer, Text } from "components/atoms";
import { Modal } from "components/molecules";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";

import { InvestFundsForm } from "./InvestFundsForm";

export type InvestFundsProps = {
	balance: number;
	currency: Currency;
	uuid: string;
};

export const InvestFunds = NiceModal.create<InvestFundsProps>(props => {
	const { t } = useTranslation();

	const isPhone = useBreakpoint("tablet", "max");

	const modal = useModal();

	return (
		<Modal
			modalName={t("modal.InvestFunds.name")}
			closeModal={modal.remove}
		>
			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$display="block"
				$maxWidth={isPhone ? "300px" : "100%"}
				$breakLine
			>
				{t("modal.InvestFunds.description")}
			</Text>

			<Spacer $space="0.5" />

			<InvestFundsForm {...props} />
		</Modal>
	);
});

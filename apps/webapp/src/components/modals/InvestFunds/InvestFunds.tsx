/* import { Currency } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Text } from "@funds-tracker/ui";
import { Spacer } from "components/atoms";
import { Modal } from "components/molecules";
import { useTranslation } from "react-i18next";

import { InvestFundsForm } from "./InvestFundsForm";

export type InvestFundsProps = {
	balance: number;
	currency: Currency;
	uuid: string;
};

export const InvestFunds = NiceModal.create<InvestFundsProps>(props => {
	const { t } = useTranslation();

	const modal = useModal();

	return (
		<Modal
			modalName={t("modal.InvestFunds.name")}
			closeModal={modal.remove}
		>
			<Text className="block max-w-[300px] whitespace-normal text-center text-sm text-gray-400 sm:max-w-full">
				{t("modal.InvestFunds.description")}
			</Text>

			<Spacer $space="0.5" />

			<InvestFundsForm {...props} />
		</Modal>
	);
});
 */

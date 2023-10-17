import { Currency } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Spacer, Text } from "components/atoms";
import { Modal } from "components/molecules";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";

import { AddFundsCashAccountForm } from "./AddFundsCashAccountForm";

export type AddFundsCashAccountProps = {
	callback: ({ balance, uuid }: { balance: number; uuid: string }) => void;
	uuid: string;
	currency: Currency;
};

export const AddFundsCashAccount = NiceModal.create<AddFundsCashAccountProps>(
	({ callback, uuid, currency }) => {
		const { t } = useTranslation();

		const isPhone = useBreakpoint("tablet", "max");

		const modal = useModal();

		return (
			<Modal closeModal={modal.remove} modalName={t("modal.AddFundsCashAccount.name")}>
				<Text
					$fontSize="0.875"
					$fontColor="gray400"
					$display="block"
					$maxWidth={isPhone ? "300px" : "100%"}
					$breakLine
				>
					{t("modal.AddFundsCashAccount.description")}
				</Text>

				<Spacer $space="0.5" />

				<AddFundsCashAccountForm callback={callback} uuid={uuid} currency={currency} />
			</Modal>
		);
	},
);

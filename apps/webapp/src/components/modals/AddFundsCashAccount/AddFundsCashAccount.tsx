import { Currency } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Spacer } from "components/atoms";
import { Modal } from "components/molecules";
import { useTranslation } from "react-i18next";
import { Text } from "ui";

import { AddFundsCashAccountForm } from "./AddFundsCashAccountForm";

export type AddFundsCashAccountProps = {
	callback: ({ balance, uuid }: { balance: number; uuid: string }) => void;
	uuid: string;
	currency: Currency;
};

export const AddFundsCashAccount = NiceModal.create<AddFundsCashAccountProps>(
	({ callback, uuid, currency }) => {
		const { t } = useTranslation();

		const modal = useModal();

		return (
			<Modal
				closeModal={modal.remove}
				modalName={t("modal.AddFundsCashAccount.name")}
			>
				<Text className="block max-w-[300px] whitespace-normal text-center text-sm text-gray-400 sm:max-w-full">
					{t("modal.AddFundsCashAccount.description")}
				</Text>

				<Spacer $space="0.5" />

				<AddFundsCashAccountForm
					callback={callback}
					uuid={uuid}
					currency={currency}
				/>
			</Modal>
		);
	},
);

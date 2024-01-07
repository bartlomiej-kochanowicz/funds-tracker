/* import { Currency } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "components/molecules";
import { useTranslation } from "react-i18next";

import { OperationsTable } from "./components/OperationsTable";

export interface CashAccountOperationsProps {
	deleteModalProps: {
		name: string;
		uuid: string;
	};
	currency: Currency;
}

export const CashAccountOperations = NiceModal.create<CashAccountOperationsProps>(
	({ deleteModalProps, currency }) => {
		const { t } = useTranslation();

		const modal = useModal();

		return (
			<Modal
				modalName={t("modal.CashAccountOperations.name")}
				closeModal={modal.remove}
			>
				<OperationsTable
					uuid={deleteModalProps.uuid}
					currency={currency}
				/>
			</Modal>
		);
	},
);
 */

import { CreatePortfolioMutation } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Text } from "@funds-tracker/ui";
import { Spacer } from "components/atoms";
import { Modal } from "components/molecules";
import { useTranslation } from "react-i18next";

import { CreatePortfolioForm } from "./CreatePortfolioForm";

export type CreatePortfolioProps = {
	callback: (data: CreatePortfolioMutation) => void;
};

export const CreatePortfolio = NiceModal.create<CreatePortfolioProps>(({ callback }) => {
	const { t } = useTranslation();

	const modal = useModal();

	return (
		<Modal
			modalName={t("modal.CreatePortfolio.name")}
			closeModal={modal.remove}
		>
			<Text className="block max-w-[300px] whitespace-normal text-center text-sm text-gray-400 sm:max-w-full">
				{t("modal.CreatePortfolio.description")}
			</Text>

			<Spacer $space="0.5" />

			<CreatePortfolioForm callback={callback} />
		</Modal>
	);
});

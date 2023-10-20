import { CreatePortfolioMutation } from "__generated__/graphql";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Spacer, Text } from "components/atoms";
import { Modal } from "components/molecules";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";

import { CreatePortfolioForm } from "./CreatePortfolioForm";

export type CreatePortfolioProps = {
	callback: (data: CreatePortfolioMutation) => void;
};

export const CreatePortfolio = NiceModal.create<CreatePortfolioProps>(({ callback }) => {
	const { t } = useTranslation();

	const isPhone = useBreakpoint("tablet", "max");

	const modal = useModal();

	return (
		<Modal
			modalName={t("modal.CreatePortfolio.name")}
			closeModal={modal.remove}
		>
			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$display="block"
				$maxWidth={isPhone ? "300px" : "100%"}
				$breakLine
			>
				{t("modal.CreatePortfolio.description")}
			</Text>

			<Spacer $space="0.5" />

			<CreatePortfolioForm callback={callback} />
		</Modal>
	);
});

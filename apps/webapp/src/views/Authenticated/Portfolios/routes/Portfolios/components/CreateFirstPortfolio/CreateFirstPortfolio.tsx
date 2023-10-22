import NiceModal from "@ebay/nice-modal-react";
import { Heading, Spacer, Spreader } from "components/atoms";
import { Plus } from "lucide-react";
import { MODAL_CREATE_PORTFOLIO } from "modals/CreatePortfolio";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "ui";

interface CreateFirstPortfolioProps {
	callback: (data: any) => void;
}

export const CreateFirstPortfolio: FC<CreateFirstPortfolioProps> = ({ callback }) => {
	const { t } = useTranslation();

	const handleOpenModal = () => {
		NiceModal.show(MODAL_CREATE_PORTFOLIO, { callback });
	};

	return (
		<div className="flex items-center">
			<Heading
				$textAlign="center"
				$level="h2"
			>
				{t("page.portfolios.empty.list.title")}
			</Heading>

			<Spacer $space="0.5" />

			<Button
				onClick={handleOpenModal}
				/* $outline */
			>
				{t("page.portfolios.need.more.button")}

				<Spreader $spread="0.25" />

				<Plus />
			</Button>
		</div>
	);
};

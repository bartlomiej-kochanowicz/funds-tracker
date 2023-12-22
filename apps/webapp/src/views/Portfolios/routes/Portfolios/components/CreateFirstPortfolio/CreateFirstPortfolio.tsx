import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@faunds-tracker/ui";
import { Heading, Spacer, Spreader } from "components/atoms";
import { MODAL_CREATE_PORTFOLIO } from "components/modals/CreatePortfolio";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

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
				onPress={handleOpenModal}
				/* $outline */
			>
				{t("page.portfolios.need.more.button")}

				<Spreader $spread="0.25" />

				<Plus />
			</Button>
		</div>
	);
};

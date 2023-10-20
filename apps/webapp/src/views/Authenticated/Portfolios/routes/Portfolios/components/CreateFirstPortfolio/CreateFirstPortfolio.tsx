import NiceModal from "@ebay/nice-modal-react";
import { Box, Button, Heading, Icon, Spacer, Spreader } from "components/atoms";
import { MODAL_CREATE_PORTFOLIO } from "modals/CreatePortfolio";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

interface CreateFirstPortfolioProps {
	callback: (data: any) => void;
}

export const CreateFirstPortfolio: FC<CreateFirstPortfolioProps> = ({ callback }) => {
	const { t } = useTranslation();

	const handleOpenModal = () => {
		NiceModal.show(MODAL_CREATE_PORTFOLIO, { callback });
	};

	return (
		<Box
			$flex
			$alignItems="center"
		>
			<Heading
				$textAlign="center"
				$level="h2"
			>
				{t("page.portfolios.empty.list.title")}
			</Heading>

			<Spacer $space="0.5" />

			<Button
				onClick={handleOpenModal}
				$outline
			>
				{t("page.portfolios.need.more.button")}

				<Spreader $spread="0.25" />

				<Icon icon={FaPlus} />
			</Button>
		</Box>
	);
};

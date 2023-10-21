import { GetPortfoliosQuery } from "__generated__/graphql";
import NiceModal from "@ebay/nice-modal-react";
import { Box, Button, Dropdown, Text } from "components/atoms";
import { DropdownItems } from "components/atoms/Dropdown";
import { useUserContext } from "contexts/UserContext";
import { formatCurrency } from "helpers/formatCurrency";
import { useBreakpoint } from "hooks/useBreakpoint";
import { MoreVertical, Pencil, PieChart, Trash2 } from "lucide-react";
import { MODAL_CONFIRM_DELETE_PORTFOLIO } from "modals/ConfirmDeletePortfolio";
import { MODAL_RENAME_PORTFOLIO } from "modals/RenamePortfolio";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { generatePath } from "react-router-dom";
import { ROUTES } from "routes/paths";

interface PortfoliosPanelProps {
	updatePortfolioName: (data: { name: string; uuid: string }) => void;
	updatePortfolioList: (data: { uuid: string }) => void;
}

export const PortfolioPanel: FC<GetPortfoliosQuery["portfolios"][0] & PortfoliosPanelProps> = ({
	name,
	uuid,
	updatePortfolioName,
	updatePortfolioList,
}) => {
	const {
		user: { defaultCurrency },
	} = useUserContext();

	const { t } = useTranslation();

	const isPhone = useBreakpoint("phone", "max");

	const handleOpenRenameModal = () => {
		NiceModal.show(MODAL_RENAME_PORTFOLIO, {
			uuid,
			name,
			callback: updatePortfolioName,
		});
	};

	const handleOpenDeletePortfolioModal = () => {
		NiceModal.show(MODAL_CONFIRM_DELETE_PORTFOLIO, {
			name,
			uuid,
			callback: updatePortfolioList,
		});
	};

	const items = [
		{
			value: "manage",
			label: t("common.manage"),
			to: generatePath(ROUTES.PORTFOLIOS.PORTFOLIO, { uuid }),
			divider: "bottom",
			icon: PieChart,
		},
		{
			value: "rename",
			label: t("common.rename"),
			onClick: handleOpenRenameModal,
			icon: Pencil,
		},
		{
			value: "delete",
			label: t("common.delete"),
			onClick: handleOpenDeletePortfolioModal,
			icon: Trash2,
		},
	] satisfies DropdownItems;

	return (
		<Box
			$p={isPhone ? "medium" : "large"}
			$borderRadius="0.7"
		>
			<Box
				$flex
				$justifyContent="space-between"
			>
				<Box
					$flex
					$flexDirection="column"
				>
					<Text $fontWeight="700">{name}</Text>

					<Text>{formatCurrency(2137, defaultCurrency)}</Text>
				</Box>

				<Dropdown
					items={items}
					placement="bottom-end"
				>
					{({ isOpen, ...props }) => (
						<Button
							$outline
							$size="small"
							{...props}
						>
							<MoreVertical />
						</Button>
					)}
				</Dropdown>
			</Box>
		</Box>
	);
};

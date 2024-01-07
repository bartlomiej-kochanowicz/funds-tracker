/* import { GetPortfoliosQuery } from "__generated__/graphql";
import NiceModal from "@ebay/nice-modal-react";
import { Button, Panel, Text } from "@funds-tracker/ui";
import { Dropdown } from "components/atoms";
import { DropdownItems } from "components/atoms/Dropdown";
import { MODAL_CONFIRM_DELETE_PORTFOLIO } from "components/modals/ConfirmDeletePortfolio";
import { MODAL_RENAME_PORTFOLIO } from "components/modals/RenamePortfolio";
import { useUserContext } from "contexts/UserContext";
import { formatCurrency } from "helpers/formatCurrency";
import { MoreVertical, Pencil, PieChart, Trash2 } from "lucide-react";
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
		<Panel className="flex justify-between">
			<div className="flex flex-col">
				<Text className="font-bold">{name}</Text>

				<Text>{formatCurrency(2137, defaultCurrency)}</Text>
			</div>

			<Dropdown
				items={items}
				placement="bottom-end"
			>
				{({ isOpen, ...props }) => (
					<Button
						$outline
						{...props}
					>
						<MoreVertical />
					</Button>
				)}
			</Dropdown>
		</Panel>
	);
};
 */

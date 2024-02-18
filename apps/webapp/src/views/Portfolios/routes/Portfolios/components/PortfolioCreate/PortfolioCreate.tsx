import { Button, H2 } from "@funds-tracker/ui";
import { PortfolioCreateDialog } from "components/dialogs/Portfolios/PortfolioCreateDialog";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface PortfolioCreateProps {
	isListEmpty: boolean;
	handleRefetch: () => void;
}

export const PortfolioCreate: FC<PortfolioCreateProps> = ({ isListEmpty, handleRefetch }) => {
	const { t } = useTranslation();

	return (
		<div className="mt-16 flex flex-col items-center gap-3">
			<H2 className="text-center">
				{t(isListEmpty ? "page.portfolios.empty.list.title" : "page.portfolios.need.more")}
			</H2>

			<PortfolioCreateDialog handleRefetch={handleRefetch}>
				<Button>
					<Plus className="mr-2 size-6" />

					{t("page.portfolios.need.more.button")}
				</Button>
			</PortfolioCreateDialog>
		</div>
	);
};

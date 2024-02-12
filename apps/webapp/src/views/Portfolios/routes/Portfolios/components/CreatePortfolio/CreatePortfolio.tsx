import { Button, H2 } from "@funds-tracker/ui";
import { CreatePortfolioDialog } from "components/dialogs/CreatePortfolioDialog";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CreatePortfolioProps {
	isListEmpty: boolean;
	handleRefetch: () => void;
}

export const CreatePortfolio: FC<CreatePortfolioProps> = ({ isListEmpty, handleRefetch }) => {
	const { t } = useTranslation();

	return (
		<div className="mt-16 flex flex-col items-center gap-3">
			<H2 className="text-center">
				{t(isListEmpty ? "page.portfolios.empty.list.title" : "page.portfolios.need.more")}
			</H2>

			<CreatePortfolioDialog handleRefetch={handleRefetch}>
				<Button>
					<Plus className="mr-2 size-6" />

					{t("page.portfolios.need.more.button")}
				</Button>
			</CreatePortfolioDialog>
		</div>
	);
};

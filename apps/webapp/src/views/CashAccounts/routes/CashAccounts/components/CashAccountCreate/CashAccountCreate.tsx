import { Button, H2 } from "@funds-tracker/ui";
import { CashAccountCreateDialog } from "components/dialogs/CashAccounts/CashAccountCreateDialog";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CashAccountCreateProps {
	isListEmpty: boolean;
	handleRefetch: () => void;
}

export const CashAccountCreate: FC<CashAccountCreateProps> = ({ isListEmpty, handleRefetch }) => {
	const { t } = useTranslation();

	return (
		<div className="mt-16 flex flex-col items-center gap-3">
			<H2 className="text-center">
				{t(isListEmpty ? "page.cash_accounts.empty.list.title" : "page.cash_accounts.need.more")}
			</H2>

			<CashAccountCreateDialog handleRefetch={handleRefetch}>
				<Button>
					<Plus className="mr-2 size-6" />

					{t("page.cash_accounts.need.more.button")}
				</Button>
			</CashAccountCreateDialog>
		</div>
	);
};

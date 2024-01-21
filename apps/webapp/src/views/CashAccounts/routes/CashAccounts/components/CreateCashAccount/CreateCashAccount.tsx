import { CreateCashAccountMutation } from "__generated__/graphql";
import { Button, H2 } from "@funds-tracker/ui";
import { CreateCashAccountDialog } from "components/dialogs/CreateCashAccountDialog";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CreateCashAccountProps {
	callback: (data: CreateCashAccountMutation) => void;
	isListEmpty: boolean;
}

export const CreateCashAccount: FC<CreateCashAccountProps> = ({ callback, isListEmpty }) => {
	const { t } = useTranslation();

	return (
		<div className="mt-16 flex flex-col items-center gap-3">
			<H2 className="text-center">
				{t(isListEmpty ? "page.cash_accounts.empty.list.title" : "page.cash_accounts.need.more")}
			</H2>

			<CreateCashAccountDialog callback={callback}>
				<Button>
					<Plus className="mr-2 size-6" />

					{t(
						isListEmpty
							? "page.cash_accounts.need.more.button"
							: "page.cash_accounts.need.more.button",
					)}
				</Button>
			</CreateCashAccountDialog>
		</div>
	);
};

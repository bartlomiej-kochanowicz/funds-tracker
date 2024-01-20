import { CreateCashAccountMutation } from "__generated__/graphql";
import { Button, H2 } from "@funds-tracker/ui";
import { useCreateCashAccountModal } from "components/modals/CreateCashAccount";
import { Plus } from "lucide-react";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

interface CreateCashAccountProps {
	callback: (data: CreateCashAccountMutation) => void;
	isListEmpty: boolean;
}

export const CreateCashAccount: FC<CreateCashAccountProps> = ({ callback, isListEmpty }) => {
	const { t } = useTranslation();

	const { Modal, triggerProps } = useCreateCashAccountModal({
		callback,
	});

	return (
		<Fragment>
			<Modal />

			<div className="mt-16 flex flex-col items-center gap-3">
				<H2 className="text-center">
					{t(isListEmpty ? "page.cash_accounts.empty.list.title" : "page.cash_accounts.need.more")}
				</H2>

				<Button
					// hasIcon
					{...triggerProps}
				>
					{t(
						isListEmpty
							? "page.cash_accounts.need.more.button"
							: "page.cash_accounts.need.more.button",
					)}

					<Plus />
				</Button>
			</div>
		</Fragment>
	);
};

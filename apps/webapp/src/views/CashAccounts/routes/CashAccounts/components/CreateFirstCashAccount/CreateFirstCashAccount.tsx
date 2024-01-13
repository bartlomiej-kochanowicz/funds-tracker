import { CreateCashAccountMutation } from "__generated__/graphql";
import { Button, H2 } from "@funds-tracker/ui";
import { useCreateCashAccountModal } from "components/modals/CreateCashAccount";
import { Plus } from "lucide-react";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

interface CreateFirstCashAccountProps {
	callback: (data: CreateCashAccountMutation) => void;
}

export const CreateFirstCashAccount: FC<CreateFirstCashAccountProps> = ({ callback }) => {
	const { t } = useTranslation();

	const { Modal, triggerProps } = useCreateCashAccountModal({
		callback,
	});

	return (
		<Fragment>
			<Modal />

			<div className="mt-16 flex flex-col items-center gap-2">
				<H2 className="text-center">{t("page.cash_accounts.empty.list.title")}</H2>

				<Button
					className="flex items-center gap-2"
					{...triggerProps}
				>
					{t("page.cash_accounts.need.more.button")}

					<Plus />
				</Button>
			</div>
		</Fragment>
	);
};

import { CreateCashAccountMutation } from "__generated__/graphql";
import { Button, H2 } from "@funds-tracker/ui";
import { Plus } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CreateCashAccountProps {
	callback: (data: CreateCashAccountMutation) => void;
}

export const CreateCashAccount: FC<CreateCashAccountProps> = ({ callback }) => {
	const { t } = useTranslation();

	const handleOpenModal = () => {};

	return (
		<div className="flex flex-col items-center">
			<H2 className="text-center">{t("page.cash_accounts.need.more")}</H2>

			<Button onPress={handleOpenModal}>
				{t("page.cash_accounts.need.more.button")}

				<Plus />
			</Button>
		</div>
	);
};

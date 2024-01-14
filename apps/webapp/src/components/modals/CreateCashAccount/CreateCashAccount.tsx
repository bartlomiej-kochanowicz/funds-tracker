import { CreateCashAccountMutation } from "__generated__/graphql";
import { Dialog, ModalProps, Text } from "@funds-tracker/ui";
import { useTranslation } from "react-i18next";

import { CreateCashAccountForm } from "./CreateCashAccountForm";

export interface CreateCashAccountProps extends ModalProps {
	callback: (data: CreateCashAccountMutation) => void;
	title: string;
}

export const CreateCashAccount = (props: CreateCashAccountProps) => {
	const { t } = useTranslation();

	const { title } = props;

	return (
		<Dialog title={title}>
			<Text className="mb-2 block whitespace-normal  text-sm text-gray-400 sm:max-w-full">
				{t("modal.CreateCashAccount.description")}
			</Text>

			<CreateCashAccountForm {...props} />
		</Dialog>
	);
};

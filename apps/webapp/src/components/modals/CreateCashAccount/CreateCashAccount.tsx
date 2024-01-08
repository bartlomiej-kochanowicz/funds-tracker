import { CreateCashAccountMutation } from "__generated__/graphql";
import { ModalProps, Text } from "@funds-tracker/ui";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { CreateCashAccountForm } from "./CreateCashAccountForm";

export interface CreateCashAccountProps extends ModalProps {
	callback: (data: CreateCashAccountMutation) => void;
}

export const CreateCashAccount = (props: CreateCashAccountProps) => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<Text className="mb-2 block max-w-[300px] whitespace-normal text-center text-sm text-gray-400 sm:max-w-full">
				{t("modal.CreateCashAccount.description")}
			</Text>

			<CreateCashAccountForm {...props} />
		</Fragment>
	);
};

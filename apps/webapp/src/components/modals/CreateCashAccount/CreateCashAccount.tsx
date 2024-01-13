import { CreateCashAccountMutation } from "__generated__/graphql";
import { H3, ModalProps, Text } from "@funds-tracker/ui";
import { CurrencyCombobox } from "components/CurrencyCombobox";
import { useRef } from "react";
import { useDialog } from "react-aria";
import { useTranslation } from "react-i18next";

import { CreateCashAccountForm } from "./CreateCashAccountForm";

export interface CreateCashAccountProps extends ModalProps {
	callback: (data: CreateCashAccountMutation) => void;
	title: string;
}

export const CreateCashAccount = (props: CreateCashAccountProps) => {
	const { t } = useTranslation();

	const { title } = props;
	const dialogRef = useRef(null);

	const { dialogProps, titleProps } = useDialog({ ...props, role: "alertdialog" }, dialogRef);

	return (
		<div
			{...dialogProps}
			ref={dialogRef}
			className="outline-none"
		>
			{title && <H3 {...titleProps}>{title}</H3>}
			<hr className="mb-4" />
			<Text className="mb-2 block max-w-[300px] whitespace-normal text-center text-sm text-gray-400 sm:max-w-full">
				{t("modal.CreateCashAccount.description")}
			</Text>

			<CreateCashAccountForm {...props} />
		</div>
	);
};

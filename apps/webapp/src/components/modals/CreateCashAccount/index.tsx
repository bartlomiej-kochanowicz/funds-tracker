import { useModal } from "@funds-tracker/ui";
import { useTranslation } from "react-i18next";

import { CreateCashAccount, type CreateCashAccountProps } from "./CreateCashAccount";

export const useCreateCashAccountModal = <
	TProps extends Omit<CreateCashAccountProps, "close" | "title">,
>(
	props: TProps,
) => {
	const { t } = useTranslation();

	const title = t("modal.CreateCashAccount.name");

	return useModal({
		title,
		children: ({ close }) => (
			<CreateCashAccount
				title={title}
				close={close}
				{...props}
			/>
		),
	});
};

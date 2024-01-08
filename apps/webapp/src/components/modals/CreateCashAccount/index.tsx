import { useModal } from "@funds-tracker/ui";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import { CreateCashAccount, type CreateCashAccountProps } from "./CreateCashAccount";

export const useCreateCashAccountModal = <TProps extends Omit<CreateCashAccountProps, "close">>(
	props: TProps,
) => {
	const { t } = useTranslation();

	return useModal({
		title: t("modal.CreateCashAccount.name"),
		children: ({ close }) => (
			<Suspense>
				<CreateCashAccount
					close={close}
					{...props}
				/>
			</Suspense>
		),
	});
};

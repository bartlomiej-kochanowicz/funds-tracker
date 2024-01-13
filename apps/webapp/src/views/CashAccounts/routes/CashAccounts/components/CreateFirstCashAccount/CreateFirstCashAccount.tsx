import { CreateCashAccountMutation } from "__generated__/graphql";
import { Button, H2 } from "@funds-tracker/ui";
import { Modal } from "@funds-tracker/ui/src/components/Modal/Modal";
import { CurrencyCombobox } from "components/CurrencyCombobox";
import { CreateCashAccount } from "components/modals/CreateCashAccount/CreateCashAccount";
import { Plus } from "lucide-react";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useOverlayTriggerState } from "react-stately";

interface CreateFirstCashAccountProps {
	callback: (data: CreateCashAccountMutation) => void;
}

export const CreateFirstCashAccount: FC<CreateFirstCashAccountProps> = ({ callback }) => {
	const { t } = useTranslation();

	const state = useOverlayTriggerState({});

	// const { Modal, triggerProps } = useCreateCashAccountModal({ callback });

	return (
		<Fragment>
			{state.isOpen && (
				<Modal state={state}>
					<CreateCashAccount
						callback={callback}
						title="test"
						close={state.close}
					/>
				</Modal>
			)}

			<div className="mt-16 flex flex-col items-center gap-2">
				<H2 className="text-center">{t("page.cash_accounts.empty.list.title")}</H2>

				<Button
					className="flex items-center gap-2"
					onPress={state.open}
				>
					{t("page.cash_accounts.need.more.button")}

					<Plus />
				</Button>
			</div>
		</Fragment>
	);
};

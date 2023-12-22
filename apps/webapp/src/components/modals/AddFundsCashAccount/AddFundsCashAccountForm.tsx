import {
	AddFundsToCashAccountMutation,
	AddFundsToCashAccountMutationVariables,
	Currency,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useModal } from "@ebay/nice-modal-react";
import { Button } from "@faunds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Loader, Spacer, Spreader } from "components/atoms";
import { cache } from "config/client";
import { ADD_FUNDS_TO_CASH_ACCOUNT } from "graphql/mutations/cashAccounts/AddFundsToCashAccount";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { useCurrencyInput } from "hooks/useCurrencyInput";
import { Plus } from "lucide-react";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./AddFundsCashAccountForm.schema";

interface AddFundsCashAccountFormProps {
	callback: ({ balance, uuid }: { balance: number; uuid: string }) => void;
	uuid: string;
	currency: Currency;
}

export const AddFundsCashAccountForm: FC<AddFundsCashAccountFormProps> = ({
	callback,
	currency,
	uuid,
}) => {
	const { t } = useTranslation();

	const modal = useModal();

	const closeModal = modal.remove;

	const defaultValues = {
		amount: "",
	};

	const {
		handleSubmit,
		control,
		formState: { isSubmitting, isValid, isDirty },
	} = useForm<typeof defaultValues>({
		defaultValues,
		resolver: yupResolver(validationSchema),
		mode: "onChange",
	});

	const [addFundsToCashAcount] = useMutation<
		AddFundsToCashAccountMutation,
		AddFundsToCashAccountMutationVariables
	>(ADD_FUNDS_TO_CASH_ACCOUNT, {
		onCompleted: data => {
			callback({
				balance: data.addFundsToCashAccount.balance,
				uuid,
			});

			cache.evict({ id: "ROOT_QUERY", fieldName: `cashAccount({"uuid":"${uuid}"})` });
			cache.gc();

			closeModal();

			showSuccessToast(t("toast.add_funds.success"));
		},
		onError: () => {
			closeModal();

			showErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async (data: typeof defaultValues) => {
		await addFundsToCashAcount({
			variables: {
				data: {
					amount: Number(data.amount),
					uuid,
				},
			},
		});
	};

	const currencyInputProps = useCurrencyInput<typeof defaultValues>({
		control,
		name: "amount",
		defaultValue: defaultValues.amount,
	});

	return (
		<form
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				type="currency"
				currency={currency}
				placeholder={t("modal.AddFundsCashAccount.input.placeholder")}
				{...currencyInputProps}
			/>

			<Spacer />

			<div className="flex justify-end">
				<Button
					className="min-w-[100px] grow"
					color="gray"
					onPress={closeModal}
				>
					{t("common.cancel")}
				</Button>

				<Spreader $spread="0.5" />

				<Button
					className="min-w-[170px] grow"
					isDisabled={isSubmitting || !isValid || !isDirty}
					type="submit"
				>
					{isSubmitting && <Loader $color="white" />}

					{!isSubmitting && (
						<Fragment>
							{t("page.cash_accounts.button.add_funds")}

							<Spreader $spread="0.25" />

							<Plus />
						</Fragment>
					)}
				</Button>
			</div>
		</form>
	);
};

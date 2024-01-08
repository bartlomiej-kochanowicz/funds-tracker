import {
	CreateCashAccountInput,
	CreateCashAccountMutation,
	CreateCashAccountMutationVariables,
	Currency,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Input, Loader, ModalProps } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurrencyCombobox } from "components/CurrencyCombobox";
import { useUserContext } from "contexts/UserContext";
import { CREATE_CASH_ACCOUNT } from "graphql/mutations/cashAccounts/CreateCashAccount";
import { showErrorToast } from "helpers/showToast";
import { Plus } from "lucide-react";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./CreateCashAccountForm.schema";

interface CreateCashAccountFormProps extends ModalProps {
	callback: (data: CreateCashAccountMutation) => void;
}

export const CreateCashAccountForm: FC<CreateCashAccountFormProps> = ({ callback, close }) => {
	const { t } = useTranslation();

	const { user } = useUserContext();

	const defaultValues = {
		name: "",
		currency: user.defaultCurrency,
	} satisfies CreateCashAccountInput;

	const {
		handleSubmit,
		formState: { errors, isSubmitting, isValid, isDirty },
		register,
		control,
	} = useForm<CreateCashAccountInput>({
		defaultValues,
		resolver: yupResolver<CreateCashAccountInput>(validationSchema),
		mode: "onChange",
	});

	const [createCashAccount] = useMutation<
		CreateCashAccountMutation,
		CreateCashAccountMutationVariables
	>(CREATE_CASH_ACCOUNT, {
		onCompleted: data => {
			close();

			callback(data);
		},
		onError: () => {
			showErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async (data: CreateCashAccountInput) => {
		await createCashAccount({
			variables: {
				data,
			},
		});
	};

	/* const currencySelectProps = useRegisterCombobox<CreateCashAccountInput, Currency>({
		control,
		name: "currency",
		defaultValue: defaultValues.currency,
	}); */

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col">
				<Input
					aria-label={t("common.input.name.placeholder")}
					placeholder={t("common.input.name.placeholder")}
					isInvalid={!!errors.name}
					errorMessage={errors.name?.message}
					{...register("name")}
				/>

				<CurrencyCombobox />
			</div>

			<div className="mt-6 flex gap-4">
				<Button
					className="w-1/2"
					color="gray"
					onPress={close}
				>
					{t("common.cancel")}
				</Button>

				<Button
					className="flex w-1/2 items-center justify-center gap-2"
					isDisabled={isSubmitting || !isValid || !isDirty}
					type="submit"
				>
					{isSubmitting && <Loader />}

					{!isSubmitting && (
						<Fragment>
							{t("add.cash.accounts.button.add")}

							<Plus />
						</Fragment>
					)}
				</Button>
			</div>
		</form>
	);
};

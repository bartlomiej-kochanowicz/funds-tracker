import {
	CreateCashAccountInput,
	CreateCashAccountMutation,
	CreateCashAccountMutationVariables,
	Currency,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Icon, Input, Loader, Spacer, Spreader } from "components/atoms";
import { CurrencyCombobox } from "components/molecules";
import { useUserContext } from "contexts/UserContext";
import { CREATE_CASH_ACCOUNT } from "graphql/mutations/cashAccounts/CreateCashAccount";
import { showErrorToast } from "helpers/showToast";
import { useRegisterCombobox } from "hooks/useRegisterCombobox";
import { FC, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

import { validationSchema } from "./CreateCashAccountForm.schema";

interface CreateCashAccountFormProps {
	callback: (data: CreateCashAccountMutation) => void;
}

export const CreateCashAccountForm: FC<CreateCashAccountFormProps> = ({ callback }) => {
	const { t } = useTranslation();

	const { user } = useUserContext();

	const modal = useModal();

	const closeModal = modal.remove;

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
			closeModal();

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

	const currencySelectProps = useRegisterCombobox<CreateCashAccountInput, Currency>({
		control,
		name: "currency",
		defaultValue: defaultValues.currency,
	});

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<Box $flex $alignItems="flex-end">
				<Input
					placeholder={t("common.input.name.placeholder")}
					$flexGrow={1}
					error={errors.name?.message}
					{...register("name")}
				/>

				<Spreader $spread="0.25" />

				<CurrencyCombobox $width="130px" {...currencySelectProps} />
			</Box>

			<Spacer />

			<Box $flex $justifyContent="flex-end">
				<Button $color="tertiary" onClick={closeModal} $flexGrow={1} $minWidth="100px">
					{t("common.cancel")}
				</Button>

				<Spreader $spread="0.5" />

				<Button
					disabled={isSubmitting || !isValid || !isDirty}
					$flexGrow={1}
					$minWidth="170px"
					type="submit"
				>
					{isSubmitting && <Loader $color="white" />}

					{!isSubmitting && (
						<Fragment>
							{t("add.cash.accounts.button.add")}

							<Spreader $spread="0.25" />

							<Icon icon={FaPlus} />
						</Fragment>
					)}
				</Button>
			</Box>
		</form>
	);
};
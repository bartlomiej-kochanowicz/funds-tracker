import {
	Currency,
	IntroductionCreateCashAccountsInput,
	IntroductionCreateCashAccountsMutation,
	IntroductionCreateCashAccountsMutationVariables,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Heading, Loader, Spacer, Spreader, Text } from "components/atoms";
import { MAX_CASH_ACCOUNTS } from "constants/common";
import { useUserContext } from "contexts/UserContext";
import { motion } from "framer-motion";
import { INTRODUCTION_CREATE_CASH_ACCOUNTS } from "graphql/mutations/introduction/IntroductionCreateCashAccounts";
import { showErrorToast } from "helpers/showToast";
import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "ui";
import { useIntroductionContext } from "views/Introduction/routes/Introduction/context";

import { CashAccountsField } from "../CashAccountsField";
import { EmptyList } from "../EmptyList";
import { validationSchema } from "./CreateCashAccountsForm.schema";
import { FieldsWrapper } from "./CreateCashAccountsForm.styles";

export const CreateCashAccountsForm = () => {
	const { t } = useTranslation();

	const { updateState, actions } = useIntroductionContext();

	const { user } = useUserContext();

	const [createCashAccounts] = useMutation<
		IntroductionCreateCashAccountsMutation,
		IntroductionCreateCashAccountsMutationVariables
	>(INTRODUCTION_CREATE_CASH_ACCOUNTS, {
		onCompleted: () => {
			updateState(actions.CHANGE_TO_ADD_PORTFOLIOS);
		},
		onError: () => {
			showErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async (values: IntroductionCreateCashAccountsInput) => {
		await createCashAccounts({
			variables: {
				data: values,
			},
		});
	};

	const defaultValues = {
		cashAccounts: [
			{
				name: "",
				currency: user.defaultCurrency,
			},
		],
	} satisfies IntroductionCreateCashAccountsInput;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, isDirty },
		control,
		getValues,
	} = useForm<IntroductionCreateCashAccountsInput>({
		defaultValues,
		resolver: yupResolver<IntroductionCreateCashAccountsInput>(validationSchema),
		mode: "onChange",
	});

	const values = getValues();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "cashAccounts",
	});

	const handleAppend = () =>
		append({
			name: "",
			currency: Currency.Usd,
		});

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
		>
			<div className="flex flex-col">
				<Heading $textAlign="center">{t("add.cash.accounts.title")}</Heading>

				<Spacer $space="0.5" />

				<Text
					$fontSize="0.875"
					$fontColor="gray400"
					$textAlign="center"
				>
					<Trans
						i18nKey="add.cash.accounts.description"
						components={{
							bold: (
								<Text
									$fontSize="0.875"
									$fontColor="gray400"
									$textAlign="center"
									$fontWeight="700"
								/>
							),
						}}
					/>
				</Text>

				<Spacer $space="1.5" />

				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<div className="flex flex-col">
						{fields.length === 0 ? (
							<EmptyList
								handleAppend={handleAppend}
								i18n={{
									title: t("add.cash.accounts.empty"),
									button: t("add.cash.accounts.button.add"),
								}}
							/>
						) : null}

						<FieldsWrapper>
							{fields.map((field, index) => (
								<CashAccountsField
									key={field.id}
									index={index}
									register={register}
									control={control}
									errors={errors}
									defaultValue={values.cashAccounts[index].currency}
									remove={remove}
								/>
							))}
						</FieldsWrapper>

						<Spacer $space="0.25" />

						{fields.length > 0 && fields.length < MAX_CASH_ACCOUNTS ? (
							<Button
								color="black"
								onClick={handleAppend}
							>
								{t("add.cash.accounts.button.add.one.more")}

								<Spreader $spread="0.25" />

								<Plus />
							</Button>
						) : null}

						<Spacer $space="1.5" />

						<Button
							className="w-full"
							type="submit"
							disabled={isSubmitting || !isValid || !isDirty}
						>
							{isSubmitting ? <Loader $color="white" /> : t("page.introduction.next.step.submit")}
						</Button>
					</div>
				</form>
			</div>
		</motion.div>
	);
};

CreateCashAccountsForm.displayName = "IntroductionCreateCashAccountsForm";

import { UpdateUserMutation, UpdateUserMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Heading, Loader, Spacer } from "components/atoms";
import { CurrencyCombobox } from "components/molecules";
import { useUserContext } from "contexts/UserContext";
import { motion } from "framer-motion";
import { UPDATE_USER } from "graphql/mutations/common/UpdateUser";
import { showErrorToast } from "helpers/showToast";
import { useRegisterCombobox } from "hooks/useRegisterCombobox";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Button, Text } from "ui";
import { useIntroductionContext } from "views/Introduction/routes/Introduction/context";

import { FormSchemaType, validationSchema } from "./DefaultCurrency.schema";

export const DefaultCurrency = () => {
	const { t } = useTranslation();

	const { updateState, actions } = useIntroductionContext();

	const { updateUser: updateUserGlobal } = useUserContext();

	const defaultValues = {
		defaultCurrency: undefined,
	};

	const {
		handleSubmit,
		formState: { isSubmitting, isValid },
		control,
	} = useForm<FormSchemaType>({
		defaultValues,
		mode: "onChange",
		resolver: yupResolver(validationSchema),
	});

	const defaultCurrencySelectProps = useRegisterCombobox<FormSchemaType>({
		control,
		name: "defaultCurrency",
	});

	const [updateUser] = useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UPDATE_USER, {
		onCompleted: data => {
			updateUserGlobal({
				defaultCurrency: data.updateUser.defaultCurrency,
				introductionStep: data.updateUser.introductionStep,
			});

			updateState(actions.CHANGE_TO_ADD_CASH_ACCOUNTS);
		},
		onError: () => {
			showErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async (data: FormSchemaType) => {
		await updateUser({
			variables: {
				data,
			},
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
		>
			<div className="flex flex-col">
				<Heading $textAlign="center">{t("page.introduction.default.currency.title")}</Heading>

				<Spacer $space="0.5" />

				<Text className="text-center text-sm text-gray-400">
					<Trans
						i18nKey="page.introduction.default.currency.description"
						components={{
							bold: <Text className="text-center text-sm font-bold text-gray-400" />,
						}}
					/>
				</Text>

				<Spacer $space="1.5" />

				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<CurrencyCombobox {...defaultCurrencySelectProps} />

					<Spacer $space="1.5" />

					<Button
						className="w-full"
						type="submit"
						disabled={isSubmitting || !isValid}
					>
						{isSubmitting ? <Loader $color="white" /> : t("page.introduction.next.step.submit")}
					</Button>
				</form>
			</div>
		</motion.div>
	);
};

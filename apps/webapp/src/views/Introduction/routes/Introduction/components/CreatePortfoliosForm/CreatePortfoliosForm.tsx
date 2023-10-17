import {
	IntroductionCreatePortfoliosInput,
	IntroductionCreatePortfoliosMutation,
	IntroductionCreatePortfoliosMutationVariables,
	IntroductionStep,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Heading, Icon, Loader, Spacer, Spreader, Text } from "components/atoms";
import { MAX_PORTFOLIOS } from "constants/common";
import { useUserContext } from "contexts/UserContext";
import { motion } from "framer-motion";
import { INTRODUCTION_CREATE_PORTFOLIOS } from "graphql/mutations/introduction/IntroductionCreatePortfolios";
import { showErrorToast } from "helpers/showToast";
import { useFieldArray, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { useIntroductionContext } from "views/Introduction/routes/Introduction/context";

import { EmptyList } from "../EmptyList";
import { PortfoliosField } from "../PortfoliosField";
import { validationSchema } from "./CreatePortfoliosForm.schema";
import { FieldsWrapper } from "./CreatePortfoliosForm.styles";

export const CreatePortfoliosForm = () => {
	const { t } = useTranslation();

	const { updateState, actions } = useIntroductionContext();

	const { updateUser: updateUserGlobal } = useUserContext();

	const [createPortfolios] = useMutation<
		IntroductionCreatePortfoliosMutation,
		IntroductionCreatePortfoliosMutationVariables
	>(INTRODUCTION_CREATE_PORTFOLIOS, {
		onCompleted: () => {
			updateState(actions.CHANGE_TO_COMPLETED);

			updateUserGlobal({
				introductionStep: IntroductionStep.Completed,
			});
		},
		onError: () => {
			showErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async (data: IntroductionCreatePortfoliosInput) => {
		await createPortfolios({
			variables: {
				data,
			},
		});
	};

	const defaultValues = {
		portfolios: [],
	} satisfies IntroductionCreatePortfoliosInput;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isValid, isDirty },
		control,
	} = useForm<IntroductionCreatePortfoliosInput>({
		defaultValues,
		resolver: yupResolver<IntroductionCreatePortfoliosInput>(validationSchema),
		mode: "onChange",
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "portfolios",
	});

	const handleAppend = () =>
		append({
			name: "",
		});

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
		>
			<Box $flex $flexDirection="column">
				<Heading $textAlign="center">{t("add.portfolios.title")}</Heading>

				<Spacer $space="0.5" />

				<Text $fontSize="0.875" $fontColor="gray400" $textAlign="center">
					<Trans
						i18nKey="add.portfolios.description"
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

				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<Box $flex $flexDirection="column">
						{fields.length === 0 ? (
							<EmptyList
								handleAppend={handleAppend}
								i18n={{
									title: t("add.portfolios.empty"),
									button: t("add.portfolios.button.add"),
								}}
							/>
						) : null}

						<FieldsWrapper>
							{fields.map((field, index) => (
								<PortfoliosField
									key={field.id}
									index={index}
									register={register}
									errors={errors}
									remove={remove}
								/>
							))}
						</FieldsWrapper>

						<Spacer $space="0.25" />

						{fields.length > 0 && fields.length < MAX_PORTFOLIOS ? (
							<Button $color="secondary" onClick={handleAppend}>
								{t("add.portfolios.button.add.one.more")}

								<Spreader $spread="0.25" />

								<Icon icon={FaPlus} />
							</Button>
						) : null}

						<Spacer $space="1.5" />

						<Button
							$size="large"
							type="submit"
							disabled={isSubmitting || !isValid || !isDirty}
							$width="100%"
						>
							{isSubmitting ? <Loader $color="white" /> : t("page.introduction.next.step.submit")}
						</Button>
					</Box>
				</form>
			</Box>
		</motion.div>
	);
};

CreatePortfoliosForm.displayName = "IntroductionCreatePortfoliosForm";

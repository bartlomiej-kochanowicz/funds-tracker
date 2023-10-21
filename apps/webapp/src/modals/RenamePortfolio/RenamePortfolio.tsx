import { UpdatePortfolioMutation, UpdatePortfolioMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Input, Loader, Spacer, Spreader } from "components/atoms";
import { Modal } from "components/molecules";
import { UPDATE_PORTFOLIO } from "graphql/mutations/portfolios/UpdatePortfolio";
import { showErrorToast } from "helpers/showToast";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "ui";

import { validationSchema } from "./RenamePortfolio.schema";

export interface RenamePortfolioProps {
	uuid: string;
	name: string;
	callback: (data: { name: string; uuid: string }) => void;
}

export const RenamePortfolio = NiceModal.create<RenamePortfolioProps>(
	({ uuid, name, callback }) => {
		const { t } = useTranslation();

		const modal = useModal();

		const defaultValues = {
			name,
		};

		const {
			handleSubmit,
			formState: { isSubmitting, isValid, isDirty, errors },
			register,
		} = useForm({ defaultValues, resolver: yupResolver(validationSchema), mode: "onChange" });

		const [updatePortfolio] = useMutation<
			UpdatePortfolioMutation,
			UpdatePortfolioMutationVariables
		>(UPDATE_PORTFOLIO, {
			onCompleted: ({ updatePortfolio: { name: newName } }) => {
				callback({ name: newName, uuid });

				modal.remove();
			},
			onError: () => {
				modal.remove();

				showErrorToast(t("service.unknown_error"));
			},
		});

		const onSubmit = async ({ name: newName }: typeof defaultValues) => {
			await updatePortfolio({ variables: { data: { name: newName }, uuid } });
		};

		return (
			<Modal
				closeModal={modal.remove}
				modalName={t("modal.RenamePortfolio.name")}
			>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						defaultValue={defaultValues.name}
						placeholder={t("common.input.name.placeholder")}
						{...register("name")}
						error={errors.name?.message}
					/>

					<Spacer />

					<Box
						$flex
						$justifyContent="flex-end"
					>
						<Button
							className="min-w-[120px] grow"
							color="gray"
							onClick={modal.remove}
						>
							{t("common.cancel")}
						</Button>

						<Spreader $spread="0.5" />

						<Button
							className="min-w-[120px] grow"
							disabled={isSubmitting || !isValid || !isDirty}
							type="submit"
						>
							{isSubmitting && <Loader $color="white" />}

							{!isSubmitting && t("common.save")}
						</Button>
					</Box>
				</form>
			</Modal>
		);
	},
);

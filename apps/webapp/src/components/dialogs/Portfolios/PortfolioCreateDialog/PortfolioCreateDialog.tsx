import {
	PortfolioCreateInput,
	PortfolioCreateMutation,
	PortfolioCreateMutationVariables,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import {
	Button,
	Dialog,
	emitErrorToast,
	emitSuccessToast,
	Form,
	Input,
	Loader,
} from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { PORTFOLIO_CREATE } from "graphql/mutations/portfolios/PortfolioCreate";
import { Plus } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./PortfolioCreateForm.schema";

interface PortfolioCreateDialogProps {
	children: ReactNode;
	handleRefetch: () => void;
}

export const PortfolioCreateDialog = ({ children, handleRefetch }: PortfolioCreateDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const { t } = useTranslation();

	const defaultValues = {
		name: "",
	} satisfies PortfolioCreateInput;

	const form = useForm<PortfolioCreateInput>({
		defaultValues,
		resolver: yupResolver<PortfolioCreateInput>(validationSchema),
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = form;

	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open, reset]);

	const [portfolioCreate] = useMutation<PortfolioCreateMutation, PortfolioCreateMutationVariables>(
		PORTFOLIO_CREATE,
		{
			onCompleted: () => {
				handleRefetch();
				setOpen(false);
				emitSuccessToast(t("modal.PortfolioCreate.toast.success"));
			},
			onError: () => {
				emitErrorToast(t("service.unknown_error"));
			},
		},
	);

	const onSubmit = async (data: PortfolioCreateInput) => {
		await portfolioCreate({
			variables: {
				data,
			},
		});
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>{t("modal.PortfolioCreate.name")}</Dialog.Title>
					<Dialog.Description>{t("modal.PortfolioCreate.description")}</Dialog.Description>
				</Dialog.Header>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="my-4 flex flex-col gap-4">
							<Form.Field
								control={control}
								name="name"
								render={({ field }) => (
									<Form.Item>
										<Form.Control>
											<Input
												autoFocus
												aria-label={t("common.input.name.placeholder")}
												placeholder={t("common.input.name.placeholder")}
												{...field}
											/>
										</Form.Control>
										<Form.Message />
									</Form.Item>
								)}
							/>
						</div>

						<Dialog.Footer>
							<Dialog.Close asChild>
								<Button
									variant="secondary"
									className="w-1/2"
								>
									{t("common.cancel")}
								</Button>
							</Dialog.Close>

							<Button
								className="flex w-1/2 items-center justify-center gap-2"
								disabled={isSubmitting}
								type="submit"
							>
								{isSubmitting ? <Loader /> : <Plus className="size-6" />}

								{t("add.portfolios.button.add")}
							</Button>
						</Dialog.Footer>
					</form>
				</Form>
			</Dialog.Content>
		</Dialog>
	);
};

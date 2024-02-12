import {
	CreatePortfolioInput,
	CreatePortfolioMutation,
	CreatePortfolioMutationVariables,
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
import { CREATE_PORTFOLIO } from "graphql/mutations/portfolios/CreatePortfolio";
import { Plus } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./CreatePortfolioForm.schema";

interface CreatePortfolioDialogProps {
	children: ReactNode;
	handleRefetch: () => void;
}

export const CreatePortfolioDialog = ({ children, handleRefetch }: CreatePortfolioDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const { t } = useTranslation();

	const defaultValues = {
		name: "",
	} satisfies CreatePortfolioInput;

	const form = useForm<CreatePortfolioInput>({
		defaultValues,
		resolver: yupResolver<CreatePortfolioInput>(validationSchema),
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

	const [createPortfolio] = useMutation<CreatePortfolioMutation, CreatePortfolioMutationVariables>(
		CREATE_PORTFOLIO,
		{
			onCompleted: () => {
				handleRefetch();
				setOpen(false);
				emitSuccessToast(t("modal.CreatePortfolio.toast.success"));
			},
			onError: () => {
				emitErrorToast(t("service.unknown_error"));
			},
		},
	);

	const onSubmit = async (data: CreatePortfolioInput) => {
		await createPortfolio({
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
					<Dialog.Title>{t("modal.CreatePortfolio.name")}</Dialog.Title>
					<Dialog.Description>{t("modal.CreatePortfolio.description")}</Dialog.Description>
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

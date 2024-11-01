import {
	Button,
	emitErrorToast,
	emitSuccessToast,
	Form,
	Input,
	Loader,
	responsiveDialog,
} from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutationPortfolioCreate } from "hooks/api/portfolios/useMutationPortfolioCreate";
import { Plus } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	PortfolioCreateFormSchema,
	PortfolioCreateFormSchemaType,
} from "./PortfolioCreateFormSchema";

interface PortfolioCreateDialogProps {
	children: ReactNode;
	handleRefetch: () => void;
}

export const PortfolioCreateDialog = ({ children, handleRefetch }: PortfolioCreateDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const { t } = useTranslation();

	const defaultValues = {
		name: "",
	} satisfies PortfolioCreateFormSchemaType;

	const form = useForm<PortfolioCreateFormSchemaType>({
		defaultValues,
		resolver: yupResolver(PortfolioCreateFormSchema),
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

	const [portfolioCreate] = useMutationPortfolioCreate({
		onCompleted: () => {
			handleRefetch();
			setOpen(false);
			emitSuccessToast(t("modal.PortfolioCreate.toast.success"));
		},
		onError: () => {
			emitErrorToast(t("api.unknown_error"));
		},
	});

	const onSubmit = async (data: PortfolioCreateFormSchemaType) => {
		await portfolioCreate({
			variables: {
				data,
			},
		});
	};

	const ResponsiveDialog = responsiveDialog();

	return (
		<ResponsiveDialog
			open={open}
			onOpenChange={setOpen}
		>
			<ResponsiveDialog.Trigger asChild>{children}</ResponsiveDialog.Trigger>
			<ResponsiveDialog.Content>
				<ResponsiveDialog.Header>
					<ResponsiveDialog.Title>{t("modal.PortfolioCreate.name")}</ResponsiveDialog.Title>
					<ResponsiveDialog.Description>
						{t("modal.PortfolioCreate.description")}
					</ResponsiveDialog.Description>
				</ResponsiveDialog.Header>
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

						<ResponsiveDialog.Footer>
							<ResponsiveDialog.Close asChild>
								<Button
									variant="secondary"
									className="md:w-1/2"
								>
									{t("common.cancel")}
								</Button>
							</ResponsiveDialog.Close>

							<Button
								className="flex items-center justify-center gap-2 md:w-1/2"
								disabled={isSubmitting}
								type="submit"
							>
								{isSubmitting ? <Loader /> : <Plus className="size-6" />}

								{t("add.portfolios.button.add")}
							</Button>
						</ResponsiveDialog.Footer>
					</form>
				</Form>
			</ResponsiveDialog.Content>
		</ResponsiveDialog>
	);
};

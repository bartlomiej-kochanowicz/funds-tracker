import {
	Button,
	emitErrorToast,
	emitSuccessToast,
	Form,
	Input,
	responsiveDialog,
} from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutationPortfolioUpdate } from "hooks/api/portfolios/useMutationPortfolioUpdate";
import { Loader, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	PortfolioRenameFormSchema,
	PortfolioRenameFormSchemaType,
} from "./PortfolioRenameFormSchema";

type UsePortfolioRenameDialogProps = {
	handleRefetch: () => void;
	name: string;
	uuid: string;
};

export const usePortfolioRenameDialog = ({
	uuid,
	name,
	handleRefetch,
}: UsePortfolioRenameDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const defaultValues = {
		name,
	} satisfies PortfolioRenameFormSchemaType;

	const form = useForm<PortfolioRenameFormSchemaType>({
		defaultValues,
		resolver: yupResolver(PortfolioRenameFormSchema),
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
		control,
	} = form;

	const [portfolioUpdate] = useMutationPortfolioUpdate({
		onCompleted: () => {
			handleRefetch();

			setOpen(false);

			emitSuccessToast(t("modal.PortfolioRename.toast.success"));
		},
		onError: () => {
			emitErrorToast(t("api.unknown_error"));
		},
	});

	const onSubmit = async ({ name: newName }: PortfolioRenameFormSchemaType) => {
		await portfolioUpdate({ variables: { data: { name: newName }, uuid } });
	};

	const ResponsiveDialog = responsiveDialog();

	return {
		open: handleOpen,
		dialog: (
			<ResponsiveDialog
				open={open}
				onOpenChange={setOpen}
			>
				<ResponsiveDialog.Content>
					<ResponsiveDialog.Header>
						<ResponsiveDialog.Title>{t("modal.PortfolioRename.name")}</ResponsiveDialog.Title>
					</ResponsiveDialog.Header>

					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-4"
						>
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
									{isSubmitting ? <Loader /> : <Pencil className="size-4" />}

									{t("modal.rename.submit")}
								</Button>
							</ResponsiveDialog.Footer>
						</form>
					</Form>
				</ResponsiveDialog.Content>
			</ResponsiveDialog>
		),
	};
};

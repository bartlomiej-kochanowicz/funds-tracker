import {
	CashAccountUpdateMutation,
	CashAccountUpdateMutationVariables,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import {
	Button,
	emitErrorToast,
	emitSuccessToast,
	Form,
	Input,
	responsiveDialog,
} from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { CASH_ACCOUNT_UPDATE } from "graphql/mutations/cashAccounts/CashAccountUpdate";
import { Loader, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CashAccountRenameFormSchema,
	CashAccountRenameFormSchemaType,
} from "./CashAccountRenameFormSchema";

type UseCashAccountRenameDialogProps = {
	handleRefetch: () => void;
	name: string;
	uuid: string;
};

export const useCashAccountRenameDialog = ({
	uuid,
	name,
	handleRefetch,
}: UseCashAccountRenameDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const defaultValues = {
		name,
	} satisfies CashAccountRenameFormSchemaType;

	const form = useForm<CashAccountRenameFormSchemaType>({
		defaultValues,
		resolver: yupResolver(CashAccountRenameFormSchema),
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
		control,
	} = form;

	const [cashAccountUpdate] = useMutation<
		CashAccountUpdateMutation,
		CashAccountUpdateMutationVariables
	>(CASH_ACCOUNT_UPDATE, {
		onCompleted: () => {
			handleRefetch();

			setOpen(false);

			emitSuccessToast(t("modal.CashAccountRename.toast.success"));
		},
		onError: () => {
			emitErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async ({ name: newName }: CashAccountRenameFormSchemaType) => {
		await cashAccountUpdate({ variables: { data: { name: newName }, uuid } });
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
						<ResponsiveDialog.Title>{t("modal.CashAccountRename.name")}</ResponsiveDialog.Title>
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

import {
	UpdateCashAccountMutation,
	UpdateCashAccountMutationVariables,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Dialog, emitErrorToast, emitSuccessToast, Form, Input } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { UPDATE_CASH_ACCOUNT } from "graphql/mutations/cashAccounts/UpdateCashAccount";
import { Loader, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./RenameCashAccount.schema";

type UseRenameCashAccountDialogProps = {
	handleRefetch: () => void;
	name: string;
	uuid: string;
};

export const useRenameCashAccountDialog = ({
	uuid,
	name,
	handleRefetch,
}: UseRenameCashAccountDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t } = useTranslation();

	const defaultValues = {
		name,
	};

	const form = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
		control,
	} = form;

	const [updateCashAccount] = useMutation<
		UpdateCashAccountMutation,
		UpdateCashAccountMutationVariables
	>(UPDATE_CASH_ACCOUNT, {
		onCompleted: () => {
			handleRefetch();

			setOpen(false);

			emitSuccessToast(t("modal.RenameCashAccount.toast.success"));
		},
		onError: () => {
			emitErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async ({ name: newName }: typeof defaultValues) => {
		await updateCashAccount({ variables: { data: { name: newName }, uuid } });
	};

	return {
		open: handleOpen,
		dialog: (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>{t("modal.RenameCashAccount.name")}</Dialog.Title>
					</Dialog.Header>

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
									{isSubmitting ? <Loader /> : <Pencil className="size-6" />}

									{t("add.cash.accounts.button.add")}
								</Button>
							</Dialog.Footer>
						</form>
					</Form>
				</Dialog.Content>
			</Dialog>
		),
	};
};

import {
	CashAccountUpdateMutation,
	CashAccountUpdateMutationVariables,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Dialog, emitErrorToast, emitSuccessToast, Form, Input } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { CASH_ACCOUNT_UPDATE } from "graphql/mutations/cashAccounts/CashAccountUpdate";
import { Loader, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./CashAccountRename.schema";

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

	const onSubmit = async ({ name: newName }: typeof defaultValues) => {
		await cashAccountUpdate({ variables: { data: { name: newName }, uuid } });
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
						<Dialog.Title>{t("modal.CashAccountRename.name")}</Dialog.Title>
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
									{isSubmitting ? <Loader /> : <Pencil className="size-4" />}

									{t("modal.rename.submit")}
								</Button>
							</Dialog.Footer>
						</form>
					</Form>
				</Dialog.Content>
			</Dialog>
		),
	};
};

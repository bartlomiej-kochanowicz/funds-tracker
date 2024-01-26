import {
	AddFundsToCashAccountMutation,
	AddFundsToCashAccountMutationVariables,
	Currency,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Dialog, Form, Loader, NumberInput } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { ADD_FUNDS_TO_CASH_ACCOUNT } from "graphql/mutations/cashAccounts/AddFundsToCashAccount";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./AddFundsCashAccountForm.schema";

type UseAddFundsToCashAccountDialogProps = {
	handleRefetch: () => void;
	uuid: string;
	currency: Currency;
};

export const useAddFundsToCashAccountDialog = ({
	handleRefetch,
	uuid,
	currency,
}: UseAddFundsToCashAccountDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t, i18n } = useTranslation();

	const defaultValues = {
		amount: 0,
	};

	const form = useForm<typeof defaultValues>({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		reset,
	} = form;

	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open, reset]);

	const [addFundsToCashAcount] = useMutation<
		AddFundsToCashAccountMutation,
		AddFundsToCashAccountMutationVariables
	>(ADD_FUNDS_TO_CASH_ACCOUNT, {
		onCompleted: () => {
			handleRefetch();

			setOpen(false);

			showSuccessToast(t("toast.add_funds.success"));
		},
		onError: () => {
			showErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async (data: typeof defaultValues) => {
		await addFundsToCashAcount({
			variables: {
				data: {
					amount: Number(data.amount),
					uuid,
				},
			},
		});
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
						<Dialog.Title>{t("modal.AddFundsCashAccount.name")}</Dialog.Title>
						<Dialog.Description>{t("modal.AddFundsCashAccount.description")}</Dialog.Description>
					</Dialog.Header>
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-4"
						>
							<Form.Field
								control={control}
								name="amount"
								render={({ field: { ...rest } }) => (
									<Form.Item>
										<Form.Control>
											<NumberInput
												autoFocus
												locale={i18n.language}
												formatOptions={{
													style: "currency",
													currency,
												}}
												aria-label={t("modal.AddFundsCashAccount.input.placeholder")}
												placeholder={t("modal.AddFundsCashAccount.input.placeholder")}
												{...rest}
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
									{isSubmitting ? <Loader /> : <Plus className="size-4" />}

									{t("page.cash_accounts.button.add_funds")}
								</Button>
							</Dialog.Footer>
						</form>
					</Form>
				</Dialog.Content>
			</Dialog>
		),
	};
};

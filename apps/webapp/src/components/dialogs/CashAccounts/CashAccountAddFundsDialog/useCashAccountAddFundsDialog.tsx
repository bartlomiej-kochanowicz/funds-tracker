import {
	CashAccountAddFundsMutation,
	CashAccountAddFundsMutationVariables,
	Currency,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import {
	Button,
	emitErrorToast,
	emitSuccessToast,
	Form,
	Loader,
	NumberInput,
	responsiveDialog,
} from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { CASH_ACCOUNT_ADD_FUNDS } from "graphql/mutations/cashAccounts/CashAccountAddFunds";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CashAccountAddFundsFormSchema,
	CashAccountAddFundsFormSchemaType,
} from "./CashAccountAddFundsFormSchema";

type UseCashAccountAddFundsDialogProps = {
	handleRefetch: () => void;
	uuid: string;
	currency: Currency;
};

export const useCashAccountAddFundsDialog = ({
	handleRefetch,
	uuid,
	currency,
}: UseCashAccountAddFundsDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const { t, i18n } = useTranslation();

	const defaultValues = {
		amount: 0,
	};

	const form = useForm<CashAccountAddFundsFormSchemaType>({
		defaultValues,
		resolver: yupResolver(CashAccountAddFundsFormSchema),
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

	const [cashAcountAddFunds] = useMutation<
		CashAccountAddFundsMutation,
		CashAccountAddFundsMutationVariables
	>(CASH_ACCOUNT_ADD_FUNDS, {
		onCompleted: () => {
			handleRefetch();

			setOpen(false);

			emitSuccessToast(t("toast.add_funds.success"));
		},
		onError: () => {
			emitErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async (data: typeof defaultValues) => {
		await cashAcountAddFunds({
			variables: {
				data: {
					amount: Number(data.amount),
					uuid,
				},
			},
		});
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
						<ResponsiveDialog.Title>{t("modal.AddFundsCashAccount.name")}</ResponsiveDialog.Title>
						<ResponsiveDialog.Description>
							{t("modal.AddFundsCashAccount.description")}
						</ResponsiveDialog.Description>
					</ResponsiveDialog.Header>
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
									{isSubmitting ? <Loader /> : <Plus className="size-4" />}

									{t("page.cash_accounts.button.add_funds")}
								</Button>
							</ResponsiveDialog.Footer>
						</form>
					</Form>
				</ResponsiveDialog.Content>
			</ResponsiveDialog>
		),
	};
};

import {
	CreateCashAccountInput,
	CreateCashAccountMutation,
	CreateCashAccountMutationVariables,
} from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Dialog, Form, Input, Loader } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { CurrencyCombobox } from "components/CurrencyCombobox";
import { useUserContext } from "contexts/UserContext";
import { CREATE_CASH_ACCOUNT } from "graphql/mutations/cashAccounts/CreateCashAccount";
import { showErrorToast } from "helpers/showToast";
import { Plus } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./CreateCashAccountForm.schema";

interface CreateCashAccountDialogProps {
	children: ReactNode;
	handleRefetch: () => void;
}

export const CreateCashAccountDialog = ({
	children,
	handleRefetch,
}: CreateCashAccountDialogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const { t } = useTranslation();

	const { user } = useUserContext();

	const defaultValues = {
		name: "",
		currency: user.defaultCurrency,
	} satisfies CreateCashAccountInput;

	const form = useForm<CreateCashAccountInput>({
		defaultValues,
		resolver: yupResolver<CreateCashAccountInput>(validationSchema),
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isSubmitSuccessful },
		reset,
	} = form;

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

	const [createCashAccount] = useMutation<
		CreateCashAccountMutation,
		CreateCashAccountMutationVariables
	>(CREATE_CASH_ACCOUNT, {
		onCompleted: () => {
			handleRefetch();
			setOpen(false);
		},
		onError: () => {
			showErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = async (data: CreateCashAccountInput) => {
		await createCashAccount({
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
					<Dialog.Title>{t("modal.CreateCashAccount.name")}</Dialog.Title>
					<Dialog.Description>{t("modal.CreateCashAccount.description")}</Dialog.Description>
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

							<Form.Field
								control={control}
								name="currency"
								render={({ field }) => (
									<Form.Item>
										<Form.Control>
											<CurrencyCombobox {...field} />
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

								{t("add.cash.accounts.button.add")}
							</Button>
						</Dialog.Footer>
					</form>
				</Form>
			</Dialog.Content>
		</Dialog>
	);
};

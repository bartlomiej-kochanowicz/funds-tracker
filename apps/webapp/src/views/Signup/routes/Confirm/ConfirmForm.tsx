import { Button, Form, Input, Loader } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "contexts/UserContext";
import { useMutationUserConfirmSignup } from "hooks/api/user/useMutationUserConfirmSignup";
import { FC, lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { ConfirmFormSchema, ConfirmFormSchemaType } from "./ConfirmFormSchema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

interface ConfirmFormProps {
	email: string;
}

export const ConfirmForm: FC<ConfirmFormProps> = ({ email }) => {
	const { t } = useTranslation();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const onVerify = useCallback(setToken, [setToken]);

	const navigate = useNavigate();

	const { getUser } = useUserContext();

	const defaultValues = { code: "" } satisfies ConfirmFormSchemaType;

	const form = useForm<ConfirmFormSchemaType>({
		defaultValues,
		resolver: yupResolver(ConfirmFormSchema),
		mode: "onChange",
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		setError,
	} = form;

	const [confirmSignup] = useMutationUserConfirmSignup({
		onCompleted: async () => {
			await getUser();

			navigate(ROUTES.HOME);
		},
		onError: () => {
			setError("code", { type: "custom", message: t("api.unknown_error") });
		},
	});

	const onSubmit = async (data: ConfirmFormSchemaType) => {
		confirmSignup({ variables: { data: { code: data.code, email, token } } });

		setRefreshReCaptcha(r => !r);
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Suspense>
					<GoogleReCaptcha
						onVerify={onVerify}
						refreshReCaptcha={refreshReCaptcha}
					/>
				</Suspense>

				<Form.Field
					control={control}
					name="code"
					render={({ field }) => (
						<Form.Item>
							<Form.Control>
								<Input
									aria-label={t("page.confirm.input.placeholder")}
									data-testid="code-input"
									placeholder={t("page.confirm.input.placeholder")}
									{...field}
								/>
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Button
					disabled={isSubmitting}
					type="submit"
					data-testid="submit-button"
				>
					{isSubmitting && <Loader className="mr-2" />}

					{t("form.button.submit")}
				</Button>
			</form>
		</Form>
	);
};

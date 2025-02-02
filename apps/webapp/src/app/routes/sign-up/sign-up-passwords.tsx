import {
	Button,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	useToggle,
} from "@funds-tracker/ui";
import { Eye, EyeOff } from "lucide-react";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SignUpFormSchema } from "./sign-up-form-schema";

export const SignUpPasswords = () => {
	const { t } = useTranslation();
	const [showPassword, toggleShowPassword] = useToggle();
	const [showPasswordConfirm, toggleShowPasswordConfirm] = useToggle();

	const { control } = useFormContext<SignUpFormSchema>();

	const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleShowPassword();
	};

	const handleShowPasswordConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleShowPasswordConfirm();
	};

	return (
		<Fragment>
			<FormField
				control={control}
				name="userPassword"
				render={({ field }) => (
					<FormItem>
						<div className="flex w-full max-w-sm items-center space-x-2">
							<FormControl>
								<Input
									type={showPassword ? "text" : "password"}
									autoFocus
									aria-label={t("form.password.label")}
									placeholder={t("form.password.label")}
									{...field}
								/>
							</FormControl>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleShowPassword}
								className="text-muted-foreground"
								aria-label={t("form.password.toggle")}
							>
								{showPassword ? <EyeOff /> : <Eye />}
							</Button>
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="userPasswordConfirm"
				render={({ field }) => (
					<FormItem>
						<div className="flex w-full max-w-sm items-center space-x-2">
							<FormControl>
								<Input
									type={showPasswordConfirm ? "text" : "password"}
									aria-label={t("form.confirm-password.label")}
									placeholder={t("form.confirm-password.label")}
									{...field}
								/>
							</FormControl>
							<Button
								variant="ghost"
								size="icon"
								onClick={handleShowPasswordConfirm}
								className="text-muted-foreground"
								aria-label={t("form.confirm-password.toggle")}
							>
								{showPasswordConfirm ? <EyeOff /> : <Eye />}
							</Button>
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Fragment>
	);
};

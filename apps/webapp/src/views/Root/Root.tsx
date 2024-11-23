import { Toaster } from "@funds-tracker/ui";
import { useTheme } from "next-themes";
import { ComponentProps, FC, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { HomeRoutes } from "views/Home";
import { NotFoundRoutes } from "views/NotFound";
import { ResetPasswordRoutes } from "views/ResetPassword";
import { SinginRoutes } from "views/Signin";
import { SignupRoutes } from "views/Signup";

export const Root: FC = () => {
	const { theme = "system" } = useTheme();

	const views = useRoutes([
		...HomeRoutes,
		...SinginRoutes,
		...SignupRoutes,
		...ResetPasswordRoutes,
		...NotFoundRoutes,
	]);

	return (
		<Suspense>
			<Toaster theme={theme as ComponentProps<typeof Toaster>["theme"]} />

			{views}
		</Suspense>
	);
};

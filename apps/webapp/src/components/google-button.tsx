import { Button, ButtonProps } from "@funds-tracker/ui";
import GoogleLogo from "assets/social/google.svg?react";
import { useTheme } from "next-themes";
import { forwardRef, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const GoogleButton = forwardRef<HTMLButtonElement, ButtonProps & Props>(
	({ children, ...props }, ref) => {
		const { theme } = useTheme();

		return (
			<Button
				variant={theme === "light" ? "outline-alternative" : "white"}
				ref={ref}
				{...props}
			>
				<GoogleLogo />

				{children}
			</Button>
		);
	},
);

export { GoogleButton };

import { Button, ButtonProps } from "@funds-tracker/ui";
import AppleLogo from "assets/social/apple.svg?react";
import { useTheme } from "next-themes";
import { forwardRef, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const AppleButton = forwardRef<HTMLButtonElement, ButtonProps & Props>(
	({ children, ...props }: Props, ref) => {
		const { theme } = useTheme();

		return (
			<Button
				variant={theme === "light" ? "outline-alternative" : "white"}
				ref={ref}
				{...props}
			>
				<AppleLogo />

				{children}
			</Button>
		);
	},
);

export { AppleButton };

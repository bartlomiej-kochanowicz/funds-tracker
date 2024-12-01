import { Button } from "@funds-tracker/ui";
import AppleLogo from "assets/social/apple.svg?react";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const AppleButton = ({ children }: Props) => {
	const { theme } = useTheme();

	return (
		<Button variant={theme === "light" ? "outline-alternative" : "white"}>
			<AppleLogo />

			{children}
		</Button>
	);
};

export { AppleButton };

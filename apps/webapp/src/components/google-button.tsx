import { Button } from "@funds-tracker/ui";
import GoogleLogo from "assets/social/google.svg?react";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

const GoogleButton = ({ children }: Props) => {
	const { theme } = useTheme();

	return (
		<Button variant={theme === "light" ? "outline-alternative" : "white"}>
			<GoogleLogo />

			{children}
		</Button>
	);
};

export { GoogleButton };

import SvgLogo from "assets/logo/logo.svg?react";
import SvgLogoDark from "assets/logo/logo-dark.svg?react";
import SvgLogoNameVertical from "assets/logo/logo-name-vertical.svg?react";
import SvgLogoNameVerticalDark from "assets/logo/logo-name-vertical-dark.svg?react";
import { useTheme } from "next-themes";

type Props = {
	className?: string;
	variant?: "icon" | "text";
};

const Logo = ({ className, variant = "icon" }: Props) => {
	const { theme } = useTheme();

	return (
		<>
			{theme === "dark" && variant === "icon" && <SvgLogo className={className} />}
			{theme === "light" && variant === "icon" && <SvgLogoDark className={className} />}

			{theme === "dark" && variant === "text" && <SvgLogoNameVertical className={className} />}
			{theme === "light" && variant === "text" && <SvgLogoNameVerticalDark className={className} />}
		</>
	);
};

export { Logo };

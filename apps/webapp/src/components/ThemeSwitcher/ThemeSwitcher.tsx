import cslx from "clsx";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { useFocusRing, useSwitch, VisuallyHidden } from "react-aria";
import { useTranslation } from "react-i18next";

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
	const { t } = useTranslation();

	const children = t("common.theme_switcher");

	const { theme, setTheme } = useTheme();

	const state = {
		isSelected: theme === "dark",
		setSelected: state => {
			if (state) {
				setTheme("dark");
			} else {
				setTheme("light");
			}
		},
		toggle: () => {},
	};

	const ref = useRef(null);
	const { inputProps } = useSwitch({ children }, state, ref);
	const { isFocusVisible, focusProps } = useFocusRing();

	return (
		<label className={cslx("relative cursor-pointer", className)}>
			<VisuallyHidden>
				<input
					{...inputProps}
					{...focusProps}
					ref={ref}
				/>
			</VisuallyHidden>

			<div
				className={cslx(
					"flex h-6 w-11 items-center justify-between rounded-full bg-gray-200 px-1 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] dark:border-gray-600 dark:bg-gray-700",
					{
						"after:translate-x-full after:border-white": state.isSelected,
						"outline-none ring-2 ring-blue-300 dark:ring-blue-800": isFocusVisible,
					},
				)}
			>
				<MoonStar className="text-white" />

				<Sun className="text-gray-700" />
			</div>
		</label>
	);
};

ThemeSwitcher.displayName = "ThemeSwitcher";

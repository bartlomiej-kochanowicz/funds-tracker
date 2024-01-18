import clsx from "clsx";
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
		<label className={clsx("relative inline-flex cursor-pointer items-center", className)}>
			<VisuallyHidden>
				<input
					{...inputProps}
					{...focusProps}
					ref={ref}
				/>
			</VisuallyHidden>

			<div
				className={clsx(
					"peer flex h-6 w-11 items-center justify-between rounded-full px-1  after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] dark:border-neutral-700",
					state.isSelected && "bg-blue-500 after:translate-x-full after:border-white",
					!state.isSelected && "bg-gray-200 dark:bg-neutral-700",
					isFocusVisible && "outline-none ring-4 ring-blue-300 dark:ring-blue-800",
				)}
			>
				<MoonStar className="size-4 text-white" />

				<Sun className="size-4 text-gray-700" />
			</div>
		</label>
	);
};

ThemeSwitcher.displayName = "ThemeSwitcher";

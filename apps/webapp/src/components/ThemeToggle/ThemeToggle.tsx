import { Button, DropdownMenu } from "@funds-tracker/ui";
import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export const ThemeToggle = () => {
	const { setTheme, theme: currentTheme, themes } = useTheme();

	const { t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					variant="outline"
					size="icon"
				>
					<Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{themes.map(theme => (
					<DropdownMenu.Item
						key={theme}
						onClick={() => setTheme(theme)}
						className="flex w-full items-center justify-between"
					>
						{t(`theme.${theme}`)}

						{theme === currentTheme && <Check className="size-4" />}
					</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};

ThemeToggle.displayName = "ThemeToggle";

import { Button, DropdownMenu } from "@funds-tracker/ui";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

export const ThemeToggle = () => {
	const { setTheme } = useTheme();

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
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item onClick={() => setTheme("light")}>Light</DropdownMenu.Item>
				<DropdownMenu.Item onClick={() => setTheme("dark")}>Dark</DropdownMenu.Item>
				<DropdownMenu.Item onClick={() => setTheme("system")}>System</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
};

ThemeToggle.displayName = "ThemeToggle";

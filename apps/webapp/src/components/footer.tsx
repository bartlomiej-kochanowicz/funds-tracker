import { Text } from "@funds-tracker/ui";

import { ThemeToggle } from "./theme-toggle";

const Footer = () => {
	return (
		<footer className="flex flex-col items-center gap-2 px-9 py-4 text-center">
			<ThemeToggle />
			<Text
				muted
				className="text-sm"
			>
				© {new Date().getFullYear()} Funds Tracker
			</Text>
		</footer>
	);
};

export { Footer };

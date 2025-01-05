import { Text } from "@funds-tracker/ui";

import { LangSelect } from "./lang-select";
import { ThemeToggle } from "./theme-toggle";

const Footer = () => {
	return (
		<footer className="flex flex-col items-center gap-2 px-9 py-4 text-center">
			<div className="flex gap-2">
				<ThemeToggle />
				<LangSelect />
			</div>

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

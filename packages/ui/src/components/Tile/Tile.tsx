import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Text } from "../Text";

interface TilelProps {
	children: ReactNode;
	title?: string;
	to?: string;
}

export const Tile = ({ children, title, to }: TilelProps) => {
	const content = (
		<div className="flex flex-col items-center justify-center">
			<div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-blue-700 text-white">
				{children}
			</div>

			{title && <Text className="mt-1 text-center text-xs font-bold leading-none">{title}</Text>}
		</div>
	);

	if (to) {
		return (
			<Link
				to={to}
				className="mx-auto w-fit no-underline"
			>
				{content}
			</Link>
		);
	}

	return content;
};

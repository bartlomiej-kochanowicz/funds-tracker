import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Text } from "ui";

import { Spacer } from "../Spacer";
import { Wrapper } from "./Tile.styles";

interface TilelProps {
	children: ReactNode;
	title?: string;
	to?: string;
}

export const Tile: FC<TilelProps> = ({ children, title, to }) => {
	const content = (
		<div className="flex flex-col">
			<Wrapper>{children}</Wrapper>

			<Spacer $space="0.25" />

			{title && <Text className="max-w-[55px] text-center text-xs font-bold">{title}</Text>}
		</div>
	);

	if (to) {
		return (
			<Link
				to={to}
				className="no-underline"
			>
				{content}
			</Link>
		);
	}

	return content;
};

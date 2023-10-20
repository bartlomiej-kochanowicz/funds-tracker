import { Text } from "components/atoms";

import { HeaderProps, ItemBase } from "../../types";
import { Cell } from "../Cell";
import { Wrapper } from "./Header.styles";

export const Header = <Item extends ItemBase>({ columns }: HeaderProps<Item>) => {
	const gridTemplateColumns = columns.reduce((acc, { width }) => `${acc} ${width || "1fr"}`, "");

	return (
		<Wrapper $gridTemplateColumns={gridTemplateColumns}>
			{columns.map(({ header, identifier, center }) => (
				<Cell
					center={center}
					key={identifier}
				>
					<Text
						$fontWeight="700"
						$fontColor="gray300"
					>
						{header}
					</Text>
				</Cell>
			))}
		</Wrapper>
	);
};

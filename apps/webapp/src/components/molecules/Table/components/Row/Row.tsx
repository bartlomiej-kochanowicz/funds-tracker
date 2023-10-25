import { ReactNode } from "react";
import { Text } from "ui";

import { ColumnAccessor, CustomColumn, ItemBase, RowProps } from "../../types";
import { Cell } from "../Cell";
import { Wrapper } from "./Row.styles";

export const Row = <Item extends ItemBase>({ data, columns }: RowProps<Item>) => {
	const gridTemplateColumns = columns.reduce((acc, { width }) => `${acc} ${width || "1fr"}`, "");

	return (
		<Wrapper gridTemplateColumns={gridTemplateColumns}>
			{columns.map(column => {
				if ((column as ColumnAccessor<Item>).accessor) {
					return (
						<Cell
							center={column.center}
							key={column.identifier}
						>
							<Text
								className="text-gray-600"
								style={{
									maxWidth: column.width,
								}}
							>
								{data[(column as ColumnAccessor<Item>).accessor] as ReactNode}
							</Text>
						</Cell>
					);
				}

				return (
					<Cell
						center={column.center}
						key={column.identifier}
					>
						{(column as CustomColumn<Item>).render(data)}
					</Cell>
				);
			})}
		</Wrapper>
	);
};

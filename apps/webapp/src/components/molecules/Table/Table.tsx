import { Body } from "./components/Body";
import { Header } from "./components/Header";
import { TableWrapper, Wrapper } from "./Table.styles";
import { ItemBase, TableProps } from "./types";

export const Table = <Item extends ItemBase>({ columns, data }: TableProps<Item>) => (
	<Wrapper>
		<TableWrapper>
			<Header columns={columns} />

			<Body
				columns={columns}
				data={data}
			/>
		</TableWrapper>
	</Wrapper>
);

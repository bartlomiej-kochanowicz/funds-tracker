import {
	Table as TableComponent,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./Table";

type TableType = typeof TableComponent;

interface ITable extends TableType {
	Body: typeof TableBody;
	Caption: typeof TableCaption;
	Cell: typeof TableCell;
	Footer: typeof TableFooter;
	Head: typeof TableHead;
	Header: typeof TableHeader;
	Row: typeof TableRow;
}

export const Table = Object.assign(TableComponent, {
	Body: TableBody,
	Caption: TableCaption,
	Cell: TableCell,
	Footer: TableFooter,
	Head: TableHead,
	Header: TableHeader,
	Row: TableRow,
}) as ITable;

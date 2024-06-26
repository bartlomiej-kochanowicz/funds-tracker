import { forwardRef, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { ScrollArea, ScrollBar } from "../ScrollArea";

const Table = forwardRef<
	HTMLTableElement,
	HTMLAttributes<HTMLTableElement> & { wrapperClassName?: string }
>(({ className, wrapperClassName, ...props }, ref) => (
	<ScrollArea className={twMerge("relative w-full overflow-auto", wrapperClassName)}>
		<table
			ref={ref}
			className={twMerge("w-full caption-bottom text-sm", className)}
			{...props}
		/>
		<ScrollBar orientation="horizontal" />
	</ScrollArea>
));
Table.displayName = "Table";

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<thead
			ref={ref}
			className={twMerge("[&_tr]:border-b bg-background", className)}
			{...props}
		/>
	),
);
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tbody
			ref={ref}
			className={twMerge("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	),
);
TableBody.displayName = "TableBody";

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tfoot
			ref={ref}
			className={twMerge("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
			{...props}
		/>
	),
);
TableFooter.displayName = "TableFooter";

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={twMerge(
				"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
				className,
			)}
			{...props}
		/>
	),
);
TableRow.displayName = "TableRow";

const TableHead = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<th
			ref={ref}
			className={twMerge(
				"h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		/>
	),
);
TableHead.displayName = "TableHead";

const TableCell = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<td
			ref={ref}
			className={twMerge("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
			{...props}
		/>
	),
);
TableCell.displayName = "TableCell";

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
	({ className, ...props }, ref) => (
		<caption
			ref={ref}
			className={twMerge("mt-4 text-sm text-muted-foreground", className)}
			{...props}
		/>
	),
);
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };

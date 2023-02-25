import { ReactNode } from 'react';

type Width = `${number}px` | `${number}%`;

type Identifier = string | number;

export interface ColumnAccessor<Item> {
  identifier: Identifier;
  accessor: keyof Item;
  width?: Width;
  header?: string;
}

export interface CustomColumn<Item> {
  identifier: Identifier;
  render: (item: Item, handleRefresh: () => void) => ReactNode;
  width?: Width;
  header?: string;
}

export type Column<Item> = ColumnAccessor<Item> | CustomColumn<Item>;

export interface TableProps<Item> {
  data: Item[];
  columns: Column<Item>[];
}

export interface HeaderProps<Item> {
  columns: Column<Item>[];
}

export interface BodyProps<Item> {
  columns: Column<Item>[];
  data: Item[];
}

export interface RowProps<Item> {
  columns: Column<Item>[];
  data: Item;
}

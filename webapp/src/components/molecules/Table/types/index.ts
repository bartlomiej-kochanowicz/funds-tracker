import { ReactNode } from 'react';

type Width = `${number}px` | `${number}%`;

type Identifier = string | number;

export interface ItemBase {
  identifier: Identifier;
}

export interface ColumnAccessor<Item extends ItemBase> {
  identifier: Identifier;
  accessor: keyof Item;
  header: string;
  width?: Width;
  center?: boolean;
}

export interface CustomColumn<Item extends ItemBase> {
  identifier: Identifier;
  render: (item: Item) => ReactNode;
  header?: string;
  width?: Width;
  center?: boolean;
}

export type Column<Item extends ItemBase> = ColumnAccessor<Item> | CustomColumn<Item>;

export interface TableProps<Item extends ItemBase> {
  data: Item[];
  columns: Column<Item>[];
}

export interface HeaderProps<Item extends ItemBase> {
  columns: Column<Item>[];
}

export interface BodyProps<Item extends ItemBase> {
  columns: Column<Item>[];
  data: Item[];
}

export interface RowProps<Item extends ItemBase> {
  columns: Column<Item>[];
  data: Item;
}

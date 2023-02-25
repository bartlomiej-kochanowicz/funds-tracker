import { Body } from './components/Body';
import { Header } from './components/Header';
import { TableWrapper } from './Table.styles';
import { TableProps } from './types';

export const Table = <Item extends unknown>({ columns, data }: TableProps<Item>) => (
  <TableWrapper>
    <Header columns={columns} />

    <Body
      columns={columns}
      data={data}
    />
  </TableWrapper>
);

import { Body } from './components/Body';
import { Header } from './components/Header';
import { TableWrapper } from './Table.styles';
import { ItemBase, TableProps } from './types';

export const Table = <Item extends ItemBase>({ columns, data }: TableProps<Item>) => (
  <div
    style={{
      overflowX: 'auto',
      overflowY: 'auto',
      width: '100%',
    }}
  >
    <TableWrapper>
      <Header columns={columns} />

      <Body
        columns={columns}
        data={data}
      />
    </TableWrapper>
  </div>
);

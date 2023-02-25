import { Text } from 'components/atoms';
import { ReactNode } from 'react';

import { ColumnAccessor, CustomColumn, RowProps } from '../../types';
import { Cell } from '../Cell';
import { Wrapper } from './Row.styles';

export const Row = <Item extends unknown>({ data, columns }: RowProps<Item>) => {
  const gridTemplateColumns = columns.reduce((acc, { width }) => `${acc} ${width || '1fr'}`, '');

  return (
    <Wrapper gridTemplateColumns={gridTemplateColumns}>
      {columns.map(column => {
        if ((column as ColumnAccessor<Item>).accessor) {
          return (
            <Cell center={column.center}>
              <Text
                fontColor="gray400"
                maxWidth={column.width}
              >
                {data[(column as ColumnAccessor<Item>).accessor] as ReactNode}
              </Text>
            </Cell>
          );
        }

        return <Cell center={column.center}>{(column as CustomColumn<Item>).render(data)}</Cell>;
      })}
    </Wrapper>
  );
};

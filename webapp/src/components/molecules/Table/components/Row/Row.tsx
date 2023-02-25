import { ReactNode } from 'react';

import { ColumnAccessor, CustomColumn, RowProps } from '../../types';
import { Wrapper } from './Row.styles';

export const Row = <Item extends unknown>({ data, columns }: RowProps<Item>) => {
  const gridTemplateColumns = columns.reduce((acc, { width }) => `${acc} ${width || '1fr'}`, '');

  return (
    <Wrapper gridTemplateColumns={gridTemplateColumns}>
      {columns.map(column => {
        if ((column as ColumnAccessor<Item>).accessor) {
          return <div>{data[(column as ColumnAccessor<Item>).accessor] as ReactNode}</div>;
        }

        return <div>{(column as CustomColumn<Item>).render(data)}</div>;
      })}
    </Wrapper>
  );
};

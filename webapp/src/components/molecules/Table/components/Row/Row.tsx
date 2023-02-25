import { RowProps } from '../../types';

export const Row = <Item extends unknown>({ data, columns }: RowProps<Item>) => {
  return <div>row</div>;
};

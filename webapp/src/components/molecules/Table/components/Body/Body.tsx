import { BodyProps } from '../../types';
import { Row } from '../Row';

export const Body = <Item extends unknown>({ columns, data }: BodyProps<Item>) => (
  <div>
    {data.map(row => (
      <Row
        data={row}
        columns={columns}
      />
    ))}
  </div>
);

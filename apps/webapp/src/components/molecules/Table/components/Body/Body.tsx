import { BodyProps, ItemBase } from '../../types';
import { Row } from '../Row';
import { Wrapper } from './Body.styles';

export const Body = <Item extends ItemBase>({ columns, data }: BodyProps<Item>) => (
  <Wrapper>
    {data.map(row => (
      <Row
        key={row.identifier}
        data={row}
        columns={columns}
      />
    ))}
  </Wrapper>
);

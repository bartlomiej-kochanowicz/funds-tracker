import { BodyProps } from '../../types';
import { Row } from '../Row';
import { Wrapper } from './Body.styles';

export const Body = <Item extends unknown>({ columns, data }: BodyProps<Item>) => (
  <Wrapper>
    {data.map(row => (
      <Row
        data={row}
        columns={columns}
      />
    ))}
  </Wrapper>
);

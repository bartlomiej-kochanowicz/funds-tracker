import { Heading } from 'components/atoms';
import { InstrumentsResponse } from 'services/model-portfolio/instruments';
import { Column } from 'simple-flexbox';
import { Instrument } from 'views/ModelPortfolio/components/Instrument';
import { Ul } from './Instruments.styles';

export const Instruments = ({ collection }: InstrumentsResponse) => (
  <Column>
    <Heading fontSize="1.5">Your model portfolio:</Heading>

    <Ul>
      {collection.map(({ uuid, ...rest }) => (
        <Instrument
          key={uuid}
          uuid={uuid}
          {...rest}
        />
      ))}
    </Ul>
  </Column>
);

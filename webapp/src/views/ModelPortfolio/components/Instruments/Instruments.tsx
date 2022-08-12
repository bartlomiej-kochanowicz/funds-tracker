import { Heading, Spacer } from 'components/atoms';
import { InstrumentsResponse } from 'services/model-portfolio/instruments';
import { Column } from 'simple-flexbox';
import { Instrument } from 'components/molecules/Instrument';
import { Ul } from './Instruments.styles';

export const Instruments = ({ collection }: InstrumentsResponse) => (
  <Column>
    <Heading fontSize="1.5">Your model portfolio:</Heading>

    <Spacer space="small" />

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

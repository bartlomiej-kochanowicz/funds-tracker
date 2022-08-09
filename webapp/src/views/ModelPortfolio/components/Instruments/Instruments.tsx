import { InstrumentsResponse } from 'services/model-portfolio/instruments';
import { Instrument } from 'views/ModelPortfolio/components/Instrument';
import { Ul } from './Instruments.styles';

export const Instruments = ({ collection }: InstrumentsResponse) => (
  <Ul>
    {collection.map(({ uuid, ...rest }) => (
      <Instrument
        uuid={uuid}
        {...rest}
      />
    ))}
  </Ul>
);

import { Instrument as InstrumentProps } from 'services/model-portfolio/instruments';
import { Wrapper } from './Instrument.styles';

export const Instrument = ({ name, type, percentage }: InstrumentProps) => (
  <Wrapper>
    {name}, {type}, {percentage}%
  </Wrapper>
);

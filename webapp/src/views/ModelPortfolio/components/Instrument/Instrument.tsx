import { Instrument as InstrumentProps } from 'services/model-portfolio/instruments';

export const Instrument = ({ name, type, percentage }: InstrumentProps) => (
  <div>
    {name}, {type}, {percentage}%
  </div>
);

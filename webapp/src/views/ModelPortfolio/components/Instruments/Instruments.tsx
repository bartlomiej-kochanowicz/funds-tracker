import { InstrumentsResponse } from 'services/model-portfolio/instruments';

export const Instruments = ({ collection }: InstrumentsResponse) => (
  <div>{JSON.stringify(collection)}</div>
);

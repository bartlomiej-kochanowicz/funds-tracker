const instruments = [
  'stocks',
  'bonds',
  'governmentBonds',
  'etfs',
  'options',
  'commodies',
  'crypto',
  'immovables',
  'movables',
  'others',
] as const;

export default instruments;

export type InstrumentTypes = (typeof instruments)[number];

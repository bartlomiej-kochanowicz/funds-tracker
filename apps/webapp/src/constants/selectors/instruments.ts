import i18n from 'utils/i18n';

import instruments from '../instruments';

export default instruments.map(instrument => ({
  value: instrument,
  label: i18n.t(`selectors.instruments.${instrument}`),
}));

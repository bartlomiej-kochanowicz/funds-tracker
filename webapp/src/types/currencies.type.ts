import { CURRENCIES } from 'constants/selectors/currencies';
import { ValueOf } from 'types/mapped-types.type';

export type Currencies = ValueOf<typeof CURRENCIES>;

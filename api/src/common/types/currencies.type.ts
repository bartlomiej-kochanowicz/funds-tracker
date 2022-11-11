import { ValueOf } from 'common/types/mapped-types.type';
import { CURRENCIES } from 'common/constants/currencies';

export type Currencies = ValueOf<typeof CURRENCIES>;

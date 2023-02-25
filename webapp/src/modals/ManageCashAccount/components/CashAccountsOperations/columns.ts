import { CashAccountOperation } from '__generated__/graphql';
import { Column } from 'components/molecules';
import i18n from 'utils/i18n';

import { DeleteAction } from '../DeleteAction';

export const columns = [
  { identifier: 'amount', accessor: 'amount', header: i18n.t('common.amount'), width: '150px' },
  { identifier: 'type', accessor: 'type', header: i18n.t('common.type'), width: '120px' },
  { identifier: 'date', accessor: 'date', header: i18n.t('common.date') },
  {
    identifier: 'delete',
    render: DeleteAction,
    header: i18n.t('common.action'),
    width: '70px',
    center: true,
  },
] satisfies Column<Omit<CashAccountOperation, 'uuid'> & { identifier: string }>[];

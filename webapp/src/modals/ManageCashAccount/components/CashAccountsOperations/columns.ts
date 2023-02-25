import { CashAccountOperation } from '__generated__/graphql';
import { Column } from 'components/molecules';

import { DeleteAction } from '../DeleteAction';

export const columns = [
  { identifier: 'amount', accessor: 'amount', header: 'Amount', width: '150px' },
  { identifier: 'type', accessor: 'type', header: 'Type', width: '120px' },
  { identifier: 'date', accessor: 'date', header: 'Data' },
  { identifier: 'delete', render: DeleteAction, header: 'Action', width: '70px', center: true },
] satisfies Column<CashAccountOperation>[];

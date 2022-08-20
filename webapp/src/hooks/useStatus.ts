import { RequestState } from 'types/store';
import { STATUS } from 'constants/store';

export const useStatus = (
  status: RequestState,
): { loading: boolean; loaded: boolean; rejected: boolean } => {
  switch (status) {
    case STATUS.idle:
      return { loading: false, loaded: false, rejected: false };
    case STATUS.pending:
      return { loading: true, loaded: false, rejected: false };
    case STATUS.fulfilled:
      return { loading: false, loaded: true, rejected: false };
    case STATUS.rejected:
      return { loading: false, loaded: true, rejected: true };
    default:
      return { loading: false, loaded: false, rejected: false };
  }
};

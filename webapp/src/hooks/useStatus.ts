import { RequestState } from 'types/store';
import { STATUS } from 'constants/store';

export const useStatus = (status: RequestState): { loading: boolean; loaded: boolean } => {
  switch (status) {
    case STATUS.IDLE:
      return { loading: false, loaded: false };
    case STATUS.PENDING:
      return { loading: true, loaded: false };
    case STATUS.FULFILLED:
      return { loading: false, loaded: true };
    case STATUS.REJECTED:
      return { loading: false, loaded: true };
    default:
      return { loading: false, loaded: false };
  }
};

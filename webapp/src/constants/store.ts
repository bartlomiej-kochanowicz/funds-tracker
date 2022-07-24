import { RequestState } from 'types/store';
import { Dict } from 'types/mapped-types';

export const STATUS: Dict<RequestState> = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

import { RequestState } from 'types/service.type';
import { Dict } from 'types/mapped-types.type';

export const STATUS: Dict<RequestState> = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
};

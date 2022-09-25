import { RequestState } from 'types/store.type';
import { Dict } from 'types/mapped-types.type';

export const STATUS: Dict<RequestState> = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

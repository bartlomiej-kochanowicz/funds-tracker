import { RequestState } from 'types/store';
import { Dict } from 'types/mapped-types';

export const STATUS: Dict<RequestState> = {
  idle: 'idle',
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

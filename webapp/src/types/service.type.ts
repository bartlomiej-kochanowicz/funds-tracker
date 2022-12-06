export type ErrorResponse = {
  message: string;
  status: number;
  name: string;
};

export type RequestState = 'IDLE' | 'PENDING' | 'FULFILLED' | 'REJECTED';

export interface Variables<T> {
  data: T;
}

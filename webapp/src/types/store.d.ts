export type ErrorObject = { code: string | undefined; message: string | undefined };
export type RejectValue = { rejectValue: ErrorObject };

export type RequestState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

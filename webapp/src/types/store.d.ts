export type ErrorObject = { status: string | null; message: string | null };
export type RejectValue = { rejectValue: ErrorObject };

export type RequestState = 'idle' | 'pending' | 'fulfilled' | 'rejected';

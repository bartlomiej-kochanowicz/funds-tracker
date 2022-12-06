import { AxiosError } from 'axios';
import { ErrorResponse } from 'types/service.type';
import { delay } from 'utils/delay';
// import { refresh } from 'services/auth/refresh';

interface RetryHTTPParams {
  maxAttempts: number;
  backoff: (attempt: number) => number;
  retryIf: (e: unknown) => boolean;
}

const statusCodeBlacklist = [401, 403, 404];

const defaultArgs = {
  maxAttempts: 3,
  backoff: () => 0,
  retryIf: err => {
    const error = err as AxiosError<ErrorResponse>;

    if (error.response && statusCodeBlacklist.includes(error.response.status)) return false;

    return true;
  },
} as RetryHTTPParams;

export function retryHTTP<TAsyncFn extends (...args: any[]) => Promise<any>>(
  asyncFn: TAsyncFn,
  {
    maxAttempts = defaultArgs.maxAttempts,
    backoff = defaultArgs.backoff,
    retryIf = defaultArgs.retryIf,
  }: Partial<RetryHTTPParams> = defaultArgs,
) {
  return async (...args: Parameters<typeof asyncFn>): Promise<ReturnType<typeof asyncFn>> => {
    let counter = 0;
    let succeeded = false;
    let lastError: unknown;
    let result: ReturnType<typeof asyncFn> | undefined;

    while (!result && counter < maxAttempts) {
      try {
        counter++;

        result = await asyncFn(...args);

        succeeded = true;
      } catch (e: unknown) {
        lastError = e;

        const error = e as AxiosError<ErrorResponse>;

        if (error.response?.status === 401) {
          // await refresh();

          await delay(backoff(counter));
        } else if (retryIf(error)) {
          // keep on retrying if condition is met
          await delay(backoff(counter));
        } else {
          // if condition is not met, then rethrow (e.g. permissions error, 401, 403)
          // this doesn't need retrying
          throw e;
        }
      }
    }

    if (!succeeded) {
      throw lastError;
    }

    return result as ReturnType<typeof asyncFn>;
  };
}

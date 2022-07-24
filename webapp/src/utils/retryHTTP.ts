import { delay } from 'utils/delay';

interface RetryHTTPParams {
  maxAttempts: number;
  backoff: (attempt: number) => number;
  retryIf: (e: unknown) => boolean;
}

export function retryHTTP<TAsyncFn extends (...args: any[]) => Promise<any>>(
  asyncFn: TAsyncFn,
  { maxAttempts = Infinity, backoff = () => 0, retryIf = () => true }: Partial<RetryHTTPParams>,
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
        if (retryIf(e)) {
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
    return result;
  };
}

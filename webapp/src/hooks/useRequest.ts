import { useCallback, useMemo, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { RequestReject } from 'types/service';

const defaultOptions = {
  defaultData: null,
  successToast: null,
  failureToast: null,
  successCallback: null,
  failureCallback: null,
};

interface UseRequestOptions<Response> {
  defaultData?: AxiosResponse<Response> | null;
  successToast?: string | null;
  failureToast?:
    | string
    | ((error: AxiosError<RequestReject>) => string | undefined)
    | null
    | undefined;
  successCallback?: (() => void) | null;
  failureCallback?: ((error: AxiosError<RequestReject>) => void) | null;
}

interface State<Response> {
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  data: AxiosResponse<Response | any> | null;
  error: AxiosError<RequestReject> | null;
}

interface UseRequestReturn<Request, Response> extends State<Response> {
  request: (args_0: Request) => Promise<AxiosResponse<Response, any> | null>;
}

const useRequest = <Request, Response>(
  request: (args_0: Request) => Promise<Promise<AxiosResponse<Response, any>>>,
  {
    defaultData = defaultOptions.defaultData,
    successToast = defaultOptions.successToast,
    failureToast = defaultOptions.failureToast,
    successCallback = defaultOptions.successCallback,
    failureCallback = defaultOptions.failureCallback,
  }: UseRequestOptions<Response> = defaultOptions,
): UseRequestReturn<Request, Response> => {
  const initialState = useMemo(
    () => ({
      isLoading: false,
      isLoaded: false,
      isError: false,
      data: defaultData,
      error: null,
    }),
    [defaultData],
  );

  const [state, setState] = useState<State<Response>>(initialState);

  const service = useCallback(
    async (args_0: Request) => {
      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const data = await request(args_0);

        setState({ ...initialState, data, isLoaded: true });

        if (successToast) {
          toast.success(successToast, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        if (successCallback) successCallback();

        return data;
      } catch (err) {
        const error = err as AxiosError<RequestReject>;

        setState({ ...initialState, isLoaded: true, isError: true, error });

        if (failureCallback) failureCallback(error);

        if (typeof failureToast === 'function') {
          toast.error(failureToast(error), {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        if (typeof failureToast === 'string') {
          toast.error(failureToast, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }

        return defaultData;
      }
    },
    [
      defaultData,
      failureCallback,
      failureToast,
      initialState,
      request,
      successCallback,
      successToast,
    ],
  );

  return {
    ...state,
    request: service,
  };
};

export default useRequest;

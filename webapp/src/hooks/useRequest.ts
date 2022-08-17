import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { RequestReject } from 'types/service';

const defaultOptions = {
  fetchOnStart: false,
  defaultData: null,
  successToast: null,
  errorToast: null,
  callback: null,
};

interface UseRequestOptions<Response> {
  fetchOnStart?: boolean;
  defaultData?: AxiosResponse<Response> | null;
  successToast?: string | null;
  errorToast?: string | ((error: AxiosError<RequestReject>) => string) | null;
  callback?: (() => void) | null;
}

interface State<Response> {
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  data: AxiosResponse<Response | any> | null;
  error: AxiosError<RequestReject> | null;
}

interface UseRequestReturn<Response> extends State<Response> {
  request: () => Promise<AxiosResponse<Response, any> | null>;
}

const useRequest = <Response>(
  request: () => Promise<Promise<AxiosResponse<Response, any>>>,
  {
    fetchOnStart = defaultOptions.fetchOnStart,
    defaultData = defaultOptions.defaultData,
    successToast = defaultOptions.successToast,
    errorToast = defaultOptions.errorToast,
    callback = defaultOptions.callback,
  }: UseRequestOptions<Response> = defaultOptions,
): UseRequestReturn<Response> => {
  const initialState = {
    isLoading: false,
    isLoaded: false,
    isError: false,
    data: defaultData,
    error: null,
  };

  const [state, setState] = useState<State<Response>>(initialState);

  const service = async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const data = await request();

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

      if (callback) callback();

      return data;
    } catch (err) {
      const error = err as AxiosError<RequestReject>;

      setState({ ...initialState, isLoaded: true, isError: true, error });

      if (typeof errorToast === 'function') {
        toast.error(errorToast(error), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (typeof errorToast === 'string') {
        toast.error(errorToast, {
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
  };

  useEffect(() => {
    if (fetchOnStart) {
      request();
    }
  }, [fetchOnStart, request]);

  return {
    ...state,
    request: service,
  };
};

export default useRequest;

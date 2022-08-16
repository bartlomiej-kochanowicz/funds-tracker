import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { RequestReject } from 'types/service';

const defaultOptions = {
  fetchOnStart: false,
  defaultData: null,
  successToastKey: null,
  errorToastKey: null,
  callback: null,
};

interface UseRequestOptions<Response> {
  fetchOnStart: boolean;
  defaultData: AxiosResponse<Response> | null;
  successToastKey: string | null;
  errorToastKey: string | null;
  callback: (() => void) | null;
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
    fetchOnStart,
    defaultData,
    successToastKey,
    errorToastKey,
    callback,
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

      if (successToastKey) {
        // emitTimingToastToggle(t(successToastKey), 'success');
      }

      if (callback) callback();

      return data;
    } catch (err) {
      const error = err as AxiosError<RequestReject>;

      setState({ ...initialState, isLoaded: true, isError: true, error });

      if (typeof errorToastKey === 'function') {
        // emitTimingToastToggle(errorToastKey(error), 'alert');
      }

      if (errorToastKey) {
        // emitTimingToastToggle(t(errorToastKey), 'alert');
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const defaultOptions = {
  fetchOnStart: false,
  defaultData: null,
  successToastKey: null,
  errorToastKey: null,
  callback: null,
};

interface UseRequestOptions<Response> {
  fetchOnStart: boolean;
  defaultData: Response | null;
  successToastKey: string | null;
  errorToastKey: string | null;
  callback: (() => void) | null;
}

interface UseRequestReturn<Response> {
  request: () => Promise<Promise<AxiosResponse<Response, any>>>;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  data: Response | null;
  error: null;
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

  const [state, setState] = useState(initialState);

  useEffect(() => {});

  return {
    ...state,
    request,
  };
};

export default useRequest;

import { Loader } from 'components/atoms';
import { Fragment, ReactNode } from 'react';
import { ErrorObject } from 'types/store';

interface LoadingProps<Props> {
  loading: boolean;
  loaded: boolean;
  error: ErrorObject;
  renderComponent: (data: Props) => ReactNode;
  propsComponent: Props;
}

export const Loading = <Props extends unknown>({
  loading,
  loaded,
  error,
  renderComponent,
  propsComponent,
}: LoadingProps<Props>) => (
  <Fragment>
    {loading && !loaded && <Loader size="large" />}

    {!loading && loaded && renderComponent(propsComponent)}

    {!loading && loaded && error.code && 'error xddddd'}
  </Fragment>
);

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { selectInstruments } from 'store/selectors/model-portfolio';
import { Fragment, useEffect } from 'react';
import { instrumentsThunk } from 'store/thunks/model-portfolio/instrumentsThunk';
import { useStatus } from 'hooks/useStatus';
import { AppDispatch } from 'store';
import { Loader } from 'components/atoms';

export const Instruments = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(selectInstruments);

  const { loading, loaded } = useStatus(status);

  useEffect(() => {
    dispatch(instrumentsThunk());
  }, [dispatch]);

  return (
    <ul>
      {loading && !loaded && <Loader size="large" />}

      {!loading && loaded && 'jest ok'}

      {!loading && loaded && error.code && 'error xddddd'}
    </ul>
  );
};

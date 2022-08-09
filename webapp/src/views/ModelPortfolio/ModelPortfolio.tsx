import { useEffect } from 'react';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { Box } from 'components/atoms';
import { Loading } from 'components/molecules/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { selectInstruments } from 'store/selectors/model-portfolio';
import { instrumentsThunk } from 'store/thunks/model-portfolio/instrumentsThunk';
import { useStatus } from 'hooks/useStatus';
import { AppDispatch } from 'store';
import { Instruments } from './components/Instruments';

export const ModelPortfolio = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, status, error } = useSelector(selectInstruments);

  const { loading, loaded } = useStatus(status);

  useEffect(() => {
    dispatch(instrumentsThunk());
  }, [dispatch]);

  return (
    <FullscreenClear
      alignItems="center"
      justifyContent="center"
    >
      <Box
        backgroundColor="lightGray"
        p={6}
        borderRadius="tertiary"
      >
        <Loading
          loading={loading}
          loaded={loaded}
          error={error}
          propsComponent={data}
          renderComponent={props => <Instruments {...props} />}
        />
      </Box>
    </FullscreenClear>
  );
};

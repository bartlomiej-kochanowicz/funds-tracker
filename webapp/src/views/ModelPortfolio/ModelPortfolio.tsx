import { FullscreenClear } from 'layouts/FullscreenClear';
import { Box } from 'components/atoms';
import { Instruments } from './components/Instruments';

export const ModelPortfolio = () => (
  <FullscreenClear
    alignItems="center"
    justifyContent="center"
  >
    <Box
      backgroundColor="lightGray"
      p={4}
      borderRadius="tertiary"
    >
      <Instruments />
    </Box>
  </FullscreenClear>
);

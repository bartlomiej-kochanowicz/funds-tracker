import { FC } from 'react';
import { ErrorContent } from 'components/molecules';
import { FullscreenClear } from 'layouts/FullscreenClear';

export const FullscreenErrorContent: FC = () => (
  <FullscreenClear>
    <ErrorContent />
  </FullscreenClear>
);

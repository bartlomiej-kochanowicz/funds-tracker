import { Heading, Spacer, Text } from 'components/atoms';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { FC } from 'react';

export const NotFound: FC = () => (
  <FullscreenClear>
    <Heading textAlign="center">404</Heading>

    <Spacer space="tiny" />

    <Text
      fontColor="gray400"
      textAlign="center"
    >
      Page not found
    </Text>
  </FullscreenClear>
);

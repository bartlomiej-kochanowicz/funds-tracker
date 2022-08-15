import { FC } from 'react';
import { Heading, Spacer, Text } from 'components/atoms';
import { FullscreenClear } from 'layouts/FullscreenClear';

export const NotFound: FC = (): JSX.Element => (
  <FullscreenClear>
    <Heading>404</Heading>

    <Spacer space="tiny" />

    <Text
      fontColor="darkGray"
      textAlign="center"
    >
      Page not found
    </Text>
  </FullscreenClear>
);

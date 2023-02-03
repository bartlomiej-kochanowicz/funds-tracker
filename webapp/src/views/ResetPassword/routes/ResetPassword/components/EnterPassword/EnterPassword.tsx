import { Heading, Spacer, Text } from 'components/atoms';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export const EnterPassword = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Heading textAlign="center">Reset Your Password</Heading>
      <Spacer space="small" />
      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        Hi Bartłomiej Kochanowicz, please set your new password for login.
      </Text>
      <Spacer space="large" />
      form
    </Fragment>
  );
};

EnterEmail.displayName = 'EnterEmail';

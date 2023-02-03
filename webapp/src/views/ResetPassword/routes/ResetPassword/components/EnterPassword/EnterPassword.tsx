import { Heading, Spacer, Text } from 'components/atoms';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

interface EnterPasswordProps {
  token: string;
}

export const EnterPassword: FC<EnterPasswordProps> = ({ token }) => {
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

EnterPassword.displayName = 'EnterEmail';

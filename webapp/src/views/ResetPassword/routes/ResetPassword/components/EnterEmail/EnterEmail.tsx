import { Heading, RouterLink, Spacer, Text } from 'components/atoms';
import { Fragment } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTES } from 'routes/paths';

export const EnterEmail = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Heading textAlign="center">Forgot Password?</Heading>
      <Spacer space="small" />
      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        Don&apos;t worry. Resetting your password is easy, just tell us the email address you
        registered with Funds tracker.
      </Text>
      <Spacer space="large" />
      form
      <Spacer />
      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        <Trans
          i18nKey="page.signup.already_have_account"
          components={{
            signin: (
              <RouterLink
                to={ROUTES.SIGNIN}
                fontColor="blue"
              />
            ),
          }}
        />
      </Text>
    </Fragment>
  );
};

EnterEmail.displayName = 'EnterEmail';

import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button } from 'components/atoms/Button';
import { Spacer } from 'components/atoms/Spacer';
import { Input } from 'components/atoms/Input';
import { Heading } from 'components/atoms/Heading';
import { Text } from 'components/atoms/Text';
import { StyledFullscreenClear, Wrapper, Form } from './Login.styles';

export const Login = () => {
  const { t } = useTranslation(['common', 'login']);

  const { handleSubmit } = useFormik({ initialValues: {}, onSubmit: () => {} });

  return (
    <StyledFullscreenClear
      alignItems="center"
      justifyContent="center"
    >
      <Wrapper alignItems="stretch">
        <Heading textAlign="center">{t('sign_in')}</Heading>

        <Spacer space="small" />

        <Text
          fontSize="0.875"
          fontColor="darkGray"
          textAlign="center"
        >
          {t('login:page.login.description')}
        </Text>

        <Spacer space="large" />

        <Form onSubmit={handleSubmit}>
          <Input
            placeholder={t('login:page.login.email.placeholder')}
            type="email"
          />

          <Spacer />

          <Input
            placeholder={t('password')}
            type="password"
          />

          <Spacer />

          <Button
            color="black"
            width="auto"
          >
            {t('sign_in')}
          </Button>
        </Form>
      </Wrapper>
    </StyledFullscreenClear>
  );
};

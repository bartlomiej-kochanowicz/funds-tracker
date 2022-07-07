import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Spacer, Input, Heading, Text, Loader } from 'components/atoms';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/paths';
import { validationSchema } from './Login.schema';
import { StyledFullscreenClear, Wrapper, Form } from './Login.styles';

export const Login = () => {
  const { t } = useTranslation(['common', 'login']);

  const navigate = useNavigate();

  const defaultValues = { userEmail: '', userPassword: '' };

  const onSubmit = async (/* values: typeof initialValues */) => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    navigate(paths.addModelPortfolio);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

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

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder={t('login:page.login.email.placeholder')}
            type="email"
            {...register('userEmail')}
            error={errors.userEmail?.message}
          />

          <Spacer />

          <Input
            placeholder={t('password')}
            type="password"
            {...register('userPassword')}
            error={errors.userPassword?.message}
          />

          <Spacer />

          <Button
            color="black"
            width="auto"
            type="submit"
          >
            {isSubmitting ? <Loader color="white" /> : t('sign_in')}
          </Button>
        </Form>
      </Wrapper>
    </StyledFullscreenClear>
  );
};

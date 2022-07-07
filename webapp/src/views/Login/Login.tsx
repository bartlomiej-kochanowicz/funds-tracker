import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Spacer, Input, Heading, Text, Loader } from 'components/atoms';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/paths';
import { validationSchema } from './Login.schema';
import { StyledFullscreenClear, Wrapper, Form } from './Login.styles';

export const Login = () => {
  // temporary - react query in the future
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation(['common', 'login']);

  const navigate = useNavigate();

  const defaultValues = { userEmail: '', userPassword: '' };

  const onSubmit = async (/* values: typeof initialValues */) => {
    setIsLoading(true);

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    setIsLoading(false);
    navigate(paths.addModelPortfolio);
  };

  const { register, handleSubmit } = useForm({
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
          />

          <Spacer />

          <Input
            placeholder={t('password')}
            type="password"
            {...register('userPassword')}
          />

          <Spacer />

          <Button
            color="black"
            width="auto"
            type="submit"
          >
            {isLoading ? <Loader color="white" /> : t('sign_in')}
          </Button>
        </Form>
      </Wrapper>
    </StyledFullscreenClear>
  );
};

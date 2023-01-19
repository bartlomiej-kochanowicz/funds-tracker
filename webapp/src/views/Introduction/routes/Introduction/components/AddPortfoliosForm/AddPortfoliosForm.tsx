import { motion } from 'framer-motion';
import { Column } from 'simple-flexbox';
import { Trans, useTranslation } from 'react-i18next';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { Button, Heading, Loader, Spacer, Spreader, Text } from 'components/atoms';
import { yupResolver } from '@hookform/resolvers/yup';
import { MAX_PORTFOLIOS } from 'constants/common';
import { useIntroductionContext } from 'views/Introduction/routes/Introduction/context';
import { useMutation } from '@apollo/client';
import { useUserContext } from 'contexts/UserContext';
import {
  IntroductionCreatePortfoliosInput,
  IntroductionCreatePortfoliosMutation,
  IntroductionCreatePortfoliosMutationVariables,
  IntroductionStep,
} from '__generated__/graphql';
import { INTRODUCTION_CREATE_PORTFOLIOS } from 'graphql/mutations';
import { showErrorToast } from 'helpers/showToast';
import { validationSchema } from './AddPortfoliosForm.schema';
import { EmptyList } from '../EmptyList';
import { FieldsWrapper } from './AddPortfoliosForm.styles';
import { PortfoliosField } from '../PortfoliosField';

export const AddPortfoliosForm = () => {
  const { t } = useTranslation();

  const { updateState, actions } = useIntroductionContext();

  const { updateUser: updateUserGlobal } = useUserContext();

  const [createPortfolios] = useMutation<
    IntroductionCreatePortfoliosMutation,
    IntroductionCreatePortfoliosMutationVariables
  >(INTRODUCTION_CREATE_PORTFOLIOS, {
    onCompleted: () => {
      updateState(actions.CHANGE_TO_COMPLETED);

      updateUserGlobal({
        introductionStep: IntroductionStep.Completed,
      });
    },
    onError: () => {
      showErrorToast(t('service.unknown_error'));
    },
  });

  const onSubmit = async (data: IntroductionCreatePortfoliosInput) => {
    await createPortfolios({
      variables: {
        data,
      },
    });
  };

  const defaultValues = {
    portfolios: [],
  } satisfies IntroductionCreatePortfoliosInput;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    control,
  } = useForm<IntroductionCreatePortfoliosInput>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'portfolios',
  });

  const handleAppend = () =>
    append({
      name: '',
    });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Column>
        <Heading textAlign="center">{t('add.portfolios.title')}</Heading>

        <Spacer space="small" />

        <Text
          fontSize="0.875"
          fontColor="gray400"
          textAlign="center"
        >
          <Trans
            i18nKey="add.portfolios.description"
            components={{
              bold: (
                <Text
                  fontSize="0.875"
                  fontColor="gray400"
                  textAlign="center"
                  fontWeight="700"
                />
              ),
            }}
          />
        </Text>

        <Spacer space="large" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Column>
            {fields.length === 0 ? (
              <EmptyList
                handleAppend={handleAppend}
                i18n={{
                  title: t('add.portfolios.empty'),
                  button: t('add.portfolios.button.add'),
                }}
              />
            ) : null}

            <FieldsWrapper>
              {fields.map((field, index) => (
                <PortfoliosField
                  key={field.id}
                  index={index}
                  register={register}
                  errors={errors}
                  remove={remove}
                />
              ))}
            </FieldsWrapper>

            <Spacer space="tiny" />

            {fields.length > 0 && fields.length < MAX_PORTFOLIOS ? (
              <Button
                color="secondary"
                onClick={handleAppend}
              >
                {t('add.portfolios.button.add')} <Spreader spread="tiny" /> <FaPlus />
              </Button>
            ) : null}

            <Spacer space="large" />

            <Button
              size="large"
              type="submit"
              disabled={isSubmitting || !isValid || !isDirty}
              width="100%"
            >
              {isSubmitting ? <Loader color="white" /> : t('page.introduction.next.step.submit')}
            </Button>
          </Column>
        </form>
      </Column>
    </motion.div>
  );
};

AddPortfoliosForm.displayName = 'IntroductionAddPortfoliosForm';

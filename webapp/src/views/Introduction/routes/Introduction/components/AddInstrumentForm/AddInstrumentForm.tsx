import { ChangeEvent, Fragment } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import {
  Button,
  Heading,
  Input,
  Select,
  Spacer,
  Spreader,
  Checkbox,
  Loader,
  Text,
} from 'components/atoms';
import { Column, Row } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import instruments from 'constants/selectors/instruments';
import { useIntroductionContext } from 'views/Introduction/routes/Introduction/context';
import { useSelect } from 'hooks/useSelect';
import { useInput } from 'hooks/useInput';
import { validationSchema } from './AddInstrumentForm.schema';

type DefaultValues = {
  instrumentName: string;
  instrumentType: string | null;
  instrumentRebalancing: boolean;
  instrumentPercentage: number | undefined;
};

export const AddInstrumentForm = () => {
  const { t } = useTranslation();

  const options = instruments.map(({ label, ...rest }) => ({
    label: t(label),
    ...rest,
  }));

  const { updateState, actions } = useIntroductionContext();

  const onSubmit = async (values: DefaultValues) => {
    console.log(values);

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    updateState(actions.CHANGE_TO_FORM_SUCCESS);
  };

  const defaultValues = {
    instrumentName: '',
    instrumentType: null,
    instrumentRebalancing: true,
    instrumentPercentage: undefined,
  } as DefaultValues;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    resetField,
  } = useForm<DefaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const instrumentNameInputProps = useInput<DefaultValues>({
    register,
    name: 'instrumentName',
    errors,
  });

  const instrumentTypeSelectProps = useSelect<DefaultValues>({
    register,
    name: 'instrumentType',
    defaultValues,
    errors,
  });

  const handleChangeRebalancing = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) resetField('instrumentPercentage');
  };

  const instrumentPercentageInputProps = useInput<DefaultValues>({
    register,
    name: 'instrumentPercentage',
    errors,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Column>
        <Heading textAlign="center">{t('add.instrument.title')}</Heading>

        <Spacer space="small" />

        <Text
          fontSize="0.875"
          fontColor="gray400"
          textAlign="center"
        >
          {t('add.instrument.description')}
        </Text>

        <Spacer space="large" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Column>
            <Input
              placeholder={t('add.instrument.name.placeholder')}
              {...instrumentNameInputProps}
            />

            <Spacer />

            <Select
              options={options}
              placeholder={t('add.instrument.type.placeholder')}
              {...instrumentTypeSelectProps}
            />

            <Spacer />

            <Checkbox
              label={t('add.instrument.take_into_rebalance.label')}
              {...register('instrumentRebalancing', {
                onChange: handleChangeRebalancing,
              })}
            />

            <Spacer />

            <Input
              placeholder={t('add.instrument.percentage.placeholder')}
              type="number"
              unit="percentage"
              min="0"
              max="100"
              disabled={!watch('instrumentRebalancing')}
              {...instrumentPercentageInputProps}
            />

            <Spacer space="large" />

            <Row justifyContent="flex-end">
              <Button
                size="large"
                type="submit"
                color="secondary"
                disabled={isSubmitting}
                width="100%"
              >
                {isSubmitting ? (
                  <Loader color="white" />
                ) : (
                  <Fragment>
                    <FaPlus />

                    <Spreader spread="tiny" />

                    {t('add.instrument.button.submit.first')}
                  </Fragment>
                )}
              </Button>
            </Row>
          </Column>
        </form>
      </Column>
    </motion.div>
  );
};

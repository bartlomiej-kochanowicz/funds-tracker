import { ChangeEvent, Fragment } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Button, Heading, Input, Select, Spacer, Spreader, Checkbox } from 'components/atoms';
import { Column, Row } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import instruments from 'constants/selectors/instruments';
/* import { useAddModelPortfolioContext } from 'views/AddModelPortfolio/context'; */
import { useSelect } from 'hooks/useSelect';
import { useInput } from 'hooks/useInput';
import { DescribeText } from './DescribeText';
import { validationSchema } from './AddInstrumentForm.schema';

export const AddInstrumentForm = () => {
  const { t } = useTranslation();

  const options = instruments.map(({ label, ...rest }) => ({
    label: t(label),
    ...rest,
  }));

  /* const { updateState, actions } = useAddModelPortfolioContext(); */

  const onSubmit = async (values: typeof defaultValues) => {
    console.log(values);

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    // updateState(actions.CHANGE_ADD_FIRST_SUCCESS);
  };

  type DefaultValues = {
    instrumentName: string;
    instrumentType: string | null;
    instrumentRebalancing: boolean;
    instrumentPercentage: number | undefined;
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
    formState: { errors },
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
    <Fragment>
      <Heading textAlign="center">{t('add.instrument.title')}</Heading>

      <Spacer space="small" />

      <DescribeText
        fontSize="0.875"
        fontColor="darkGray"
        textAlign="center"
      >
        {t('add.instrument.description')}
      </DescribeText>

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
              type="submit"
              color="black"
            >
              <FaPlus />
              <Spreader spread="tiny" />
              Add instrument
            </Button>
          </Row>
        </Column>
      </form>
    </Fragment>
  );
};

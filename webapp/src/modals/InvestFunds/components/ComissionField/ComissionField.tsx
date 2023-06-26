import { Currency } from '__generated__/graphql';
import { Box, Input, Radio, RadioGroup, Spreader } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useCurrencyInput } from 'hooks/useCurrencyInput';
import { useRadio } from 'hooks/useRadio';
import { defaultValues, InvestFundsFormValues } from 'modals/InvestFunds/helpers/defaultValues';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

interface ComissionFieldProps {
  activeCurrency: Currency;
}

export const ComissionField: FC<ComissionFieldProps> = ({ activeCurrency }) => {
  const { t } = useTranslation();

  const { register, watch, control, setValue, getFieldState } =
    useFormContext<InvestFundsFormValues>();

  const radoProps = useRadio<InvestFundsFormValues>({
    control,
    name: 'comission_type',
    setValue,
    onChange: () => {
      setValue('comission', '');
    },
  });

  const watchComissionType = watch('comission_type');

  const isPhone = useBreakpoint('phone', 'max');

  const { error } = getFieldState('comission');

  const currencyInputProps = useCurrencyInput<InvestFundsFormValues>({
    control,
    name: 'comission',
  });

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.comission', {
        currency: activeCurrency,
      })}
      htmlFor="comission"
    >
      <Box
        flex
        alignItems="center"
        flexGrow={1}
        width={isPhone ? '100%' : 'auto'}
      >
        {watchComissionType === '%' ? (
          <Input
            id="comission"
            flexGrow={1}
            placeholder={t('modal.InvestFunds.form.input.comission.placeholder')}
            type="number"
            unit="%"
            error={error?.message}
            {...register('comission')}
          />
        ) : (
          <Input
            type="currency"
            flexGrow={1}
            placeholder={t('modal.InvestFunds.form.input.comission.placeholder')}
            currency={activeCurrency as Currency}
            error={error?.message}
            {...currencyInputProps}
          />
        )}

        <Spreader spread="0.25" />

        <RadioGroup
          defaultValue={defaultValues.comission_type}
          {...radoProps}
        >
          <Radio value="%">%</Radio>

          <Radio value="amount">{t('common.amount')}</Radio>
        </RadioGroup>
      </Box>
    </FormField>
  );
};

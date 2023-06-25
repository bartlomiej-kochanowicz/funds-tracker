import { Currency } from '__generated__/graphql';
import { Box, Input, Radio, RadioGroup, Spreader } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
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
    name: 'commission_type',
    setValue,
  });

  const watchCommissionType = watch('commission_type');

  const isPhone = useBreakpoint('phone', 'max');

  const { error } = getFieldState('commission');

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.commission', {
        currency: activeCurrency,
      })}
      htmlFor="commission"
    >
      <Box
        flex
        alignItems="center"
        flexGrow={1}
        width={isPhone ? '100%' : 'auto'}
      >
        {watchCommissionType === '%' ? (
          <Input
            id="commission"
            flexGrow={1}
            placeholder={t('modal.InvestFunds.form.input.commission.placeholder')}
            type="number"
            unit="%"
            error={error?.message}
            {...register('commission')}
          />
        ) : (
          <Input
            id="commission"
            flexGrow={1}
            placeholder={t('modal.InvestFunds.form.input.commission.placeholder')}
            type="currency"
            currency={activeCurrency as Currency}
            error={error?.message}
            {...register('commission')}
          />
        )}

        <Spreader spread="0.25" />

        <RadioGroup
          defaultValue={defaultValues.commission_type}
          {...radoProps}
        >
          <Radio value="%">%</Radio>

          <Radio value="amount">{t('common.amount')}</Radio>
        </RadioGroup>
      </Box>
    </FormField>
  );
};

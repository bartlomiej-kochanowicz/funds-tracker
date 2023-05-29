import { Currency } from '__generated__/graphql';
import { Box, Input, Select, Spreader } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useSelect } from 'hooks/useSelect';
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

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<InvestFundsFormValues>();

  const selectCommisionType = [
    {
      label: '%',
      value: '%',
    },
    {
      label: t('common.value'),
      value: 'value',
    },
  ];

  const comissionTypeProps = useSelect<InvestFundsFormValues>({
    register,
    name: 'commission_type',
    errors,
  });

  const watchCommissionType = watch('commission_type');

  const isPhone = useBreakpoint('phone', 'max');

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
        <Input
          id="commission"
          flexGrow={1}
          placeholder={t('modal.InvestFunds.form.input.commission.placeholder')}
          type="number"
          unit={watchCommissionType === '%' ? '%' : activeCurrency}
          {...register('commission')}
        />

        <Spreader spread="0.25" />

        <Select
          items={selectCommisionType}
          defaultValue={defaultValues.commission_type}
          {...comissionTypeProps}
        />
      </Box>
    </FormField>
  );
};

import { Currency } from '__generated__/graphql';
import { Box, Input, Select, Spreader } from 'components/atoms';
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
      >
        <Input
          id="commission"
          flexGrow={1}
          placeholder={t('modal.InvestFunds.form.input.commission.placeholder')}
          {...(watchCommissionType === '%'
            ? {
                type: 'number',
                unit: '%',
                min: 0,
                max: 100,
              }
            : {
                type: 'currency',
                currency: activeCurrency as Currency,
              })}
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

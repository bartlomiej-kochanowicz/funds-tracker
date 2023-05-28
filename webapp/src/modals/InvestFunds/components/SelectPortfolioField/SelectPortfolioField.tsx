import { GetPortfoliosQuery } from '__generated__/graphql';
import { useQuery } from '@apollo/client';
import { Select } from 'components/atoms';
import { GET_PORTFOLIOS } from 'graphql/query/portfolios/GetPortfolios';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

export const SelectPortfolioField = () => {
  const { t } = useTranslation();

  const { data: portfolios } = useQuery<GetPortfoliosQuery>(GET_PORTFOLIOS);

  const selectPortfolioItems =
    portfolios?.portfolios.map(portfolio => ({
      label: portfolio.name,
      value: portfolio.uuid,
    })) || [];

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.portfolio')}
      htmlFor="portfolio"
    >
      <Select
        items={selectPortfolioItems}
        placeholder={t('modal.InvestFunds.form.select.portfolio.placeholder')}
        flexGrow={1}
      />
    </FormField>
  );
};

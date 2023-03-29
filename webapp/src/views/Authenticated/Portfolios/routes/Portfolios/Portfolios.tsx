import { GetPortfoliosQuery } from '__generated__/graphql';
import { useQuery } from '@apollo/client';
import { Heading, Loader, Spacer, Text } from 'components/atoms';
import { ErrorContent } from 'components/molecules';
import { MAX_PORTFOLIOS } from 'constants/common';
import { GET_PORTFOLIOS } from 'graphql/query/portfolios/GetPortfolios';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateFirstPortfolio } from './components/CreateFirstPortfolio';
import { CreatePortfolio } from './components/CreatePortfolio';

export const Portfolios = () => {
  const { t } = useTranslation();

  const { loading, data, error, updateQuery } = useQuery<GetPortfoliosQuery>(GET_PORTFOLIOS);

  const portfoliosExist = Boolean(data && data.portfolios.length > 0);

  const renderCreatePortfolioButton = Boolean(
    data && data.portfolios.length < MAX_PORTFOLIOS && data.portfolios.length > 0,
  );

  const addCashAccountToList = () => {};

  return (
    <Fragment>
      <Heading>{t('navigation.portfolios')}</Heading>

      <Text
        fontSize="0.875"
        fontColor="gray400"
      >
        {t('page.portfolios.title.description')}
      </Text>

      <Spacer />

      {loading && <Loader size="large" />}

      {!loading && error && <ErrorContent />}

      {!loading && !portfoliosExist && !error && (
        <CreateFirstPortfolio callback={addCashAccountToList} />
      )}

      {renderCreatePortfolioButton && <CreatePortfolio callback={addCashAccountToList} />}
    </Fragment>
  );
};

import { CreatePortfolioMutation, GetPortfoliosQuery } from '__generated__/graphql';
import { useQuery } from '@apollo/client';
import { Heading, Loader, Spacer, Text } from 'components/atoms';
import { ErrorContent, Panel } from 'components/molecules';
import { MAX_PORTFOLIOS } from 'constants/common';
import { GET_PORTFOLIOS } from 'graphql/query/portfolios/GetPortfolios';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateFirstPortfolio } from './components/CreateFirstPortfolio';
import { CreatePortfolio } from './components/CreatePortfolio';
import { PortfolioPanel } from './components/PortfolioPanel';

export const Portfolios = () => {
  const { t } = useTranslation();

  const { loading, data, error, updateQuery } = useQuery<GetPortfoliosQuery>(GET_PORTFOLIOS);

  const portfoliosExist = Boolean(data && data.portfolios.length > 0);

  const renderCreatePortfolioButton = Boolean(
    data && data.portfolios.length < MAX_PORTFOLIOS && data.portfolios.length > 0,
  );

  const addCashAccountToList = (newPortfoliotData: CreatePortfolioMutation) => {
    updateQuery(prev => ({
      portfolios: [...prev.portfolios, newPortfoliotData.createPortfolio],
    }));
  };

  const updatePortfolioName = ({ name, uuid }: { name: string; uuid: string }) => {
    updateQuery(prev => ({
      portfolios: prev.portfolios.map(portfolio => {
        if (portfolio.uuid === uuid) {
          return {
            ...portfolio,
            name,
          };
        }

        return portfolio;
      }),
    }));
  };
  const updatePortfolioList = ({ uuid }: { uuid: string }) => {
    updateQuery(prev => ({
      portfolios: prev.portfolios.filter(portfolio => portfolio.uuid !== uuid),
    }));
  };

  return (
    <Fragment>
      <Heading>{t('navigation.portfolios')}</Heading>

      <Text
        fontSize="0.875"
        $fontColor="gray400"
      >
        {t('page.portfolios.title.description')}
      </Text>

      <Spacer />

      {loading && <Loader size="large" />}

      {!loading && error && <ErrorContent />}

      {!loading && !portfoliosExist && !error && (
        <CreateFirstPortfolio callback={addCashAccountToList} />
      )}

      {!loading && portfoliosExist && !error && (
        <Panel>
          {data?.portfolios.map(({ uuid, ...rest }) => (
            <PortfolioPanel
              key={uuid}
              uuid={uuid}
              updatePortfolioName={updatePortfolioName}
              updatePortfolioList={updatePortfolioList}
              {...rest}
            />
          ))}
        </Panel>
      )}

      <Spacer />

      {renderCreatePortfolioButton && <CreatePortfolio callback={addCashAccountToList} />}
    </Fragment>
  );
};

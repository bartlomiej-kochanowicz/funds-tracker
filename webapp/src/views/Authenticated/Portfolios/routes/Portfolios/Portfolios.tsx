import { Heading, Spacer, Text } from 'components/atoms';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export const Portfolios = () => {
  const { t } = useTranslation();

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
    </Fragment>
  );
};

import { FC } from 'react';
import { Button, Spacer, Spreader, Text } from 'components/atoms';
import { Panel } from 'components/molecules';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

export const AddCashAccount: FC = () => {
  const { t } = useTranslation();

  return (
    <Panel>
      <Panel.BodyCentered>
        <Text
          fontSize="1.25"
          fontWeight="700"
          textAlign="center"
        >
          {t('page.cash_accounts.need.more')}
        </Text>

        <Spacer space="small" />

        <Button>
          {t('page.cash_accounts.need.more.button')} <Spreader spread="tiny" /> <FaPlus />
        </Button>
      </Panel.BodyCentered>
    </Panel>
  );
};

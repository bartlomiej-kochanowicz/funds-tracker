import { Button, Icon, Spacer, Spreader } from 'components/atoms';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Column, Row } from 'simple-flexbox';

export const MODAL_MANAGE_CASH_ACCOUNT = 'ManageCashAccount';

export interface ManageCashAccountProps {}

export const ManageCashAccount: FC<ManageCashAccountProps> = () => {
  const { t } = useTranslation();

  return (
    <Column>
      <Column>List with operations...</Column>

      <Spacer />

      <Row justifyContent="flex-end">
        <Button
          color="error"
          minWidth="240px"
          outline
        >
          {t('modal.ManageCashAccount.button.remove')}

          <Spreader spread="tiny" />

          <Icon icon={FaTrash} />
        </Button>
      </Row>
    </Column>
  );
};

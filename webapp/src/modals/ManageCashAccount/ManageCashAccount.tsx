import { Button, Spreader } from 'components/atoms';
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
      <Row justifyContent="flex-end">
        <Button
          color="error"
          outline
        >
          {t('common.delete')} <Spreader spread="small" /> <FaTrash />
        </Button>
      </Row>
    </Column>
  );
};

import { Button, Spacer, Spreader, Text } from 'components/atoms';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Column, Row } from 'simple-flexbox';
import { Modal } from 'types/modal.type';

export const MODAL_CONFIRM_DELETE_CASH_ACCOUNT = 'ConfirmDeleteCashAccount';

export interface ConfirmDeleteCashAccountProps {
  name: string;
}

export const ConfirmDeleteCashAccount: FC<Modal<ConfirmDeleteCashAccountProps>> = ({
  name,
  closeModal,
}) => {
  const { t } = useTranslation();

  return (
    <Column>
      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        <Trans
          i18nKey="modal.ConfirmDeleteCashAccount.description"
          values={{ name }}
          components={{
            bold: (
              <Text
                fontSize="0.875"
                fontColor="gray400"
                textAlign="center"
                fontWeight="700"
              />
            ),
          }}
        />
      </Text>

      <Spacer />

      <Row>
        <Button
          color="tertiary"
          onClick={closeModal}
          width="50%"
        >
          {t('common.no')}
        </Button>

        <Spreader spread="small" />

        <Button width="50%">{t('common.yes')}</Button>
      </Row>
    </Column>
  );
};

import { Input, Select, Spreader } from 'components/atoms';
import { CURRENCIES_ARRAY } from 'constants/selectors/currencies';
import { useUserContext } from 'contexts/UserContext';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'simple-flexbox';
import { Modal } from 'types/modal.type';

export const MODAL_CREATE_CASH_ACCOUNT = 'CreateCashAccount';

export type CreateCashAccountModalProps = {};

export const CreateCashAccount: FC<Modal<CreateCashAccountModalProps>> = ({ closeModal }) => {
  const { t } = useTranslation();

  const { user } = useUserContext();

  const customLabel = ({ value }: { value: string }) => value;

  const options = useMemo(
    () =>
      CURRENCIES_ARRAY.map(currency => ({
        label: t(`currency.${currency}`),
        value: currency,
      })),
    [t],
  );

  return (
    <Row>
      <Input
        placeholder={t('common.input.name.placeholder')}
        flexGrow={1}
      />

      <Spreader spread="tiny" />

      <Select
        width="130px"
        options={options}
        customLabel={customLabel}
        defaultValue={user.defaultCurrency}
      />
    </Row>
  );
};

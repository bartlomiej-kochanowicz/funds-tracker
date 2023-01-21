import { Button, Input, Select, Spacer, Spreader, Text } from 'components/atoms';
import { CURRENCIES_ARRAY } from 'constants/selectors/currencies';
import { useUserContext } from 'contexts/UserContext';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FC, Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
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

  const isPhone = useBreakpoint('tablet', 'max');

  return (
    <Fragment>
      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        display="block"
        maxWidth={isPhone ? '300px' : '100%'}
        breakLine
      >
        {t('modal.CreateCashAccount.description')}
      </Text>

      <Spacer space="small" />

      <Row alignItems="end">
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

      <Spacer />

      <Row justifyContent="flex-end">
        <Button
          color="gray200"
          borderRadius="secondary"
          onClick={closeModal}
        >
          {t('common.cancel')}
        </Button>

        <Spreader spread="small" />

        <Button borderRadius="secondary">
          {t('add.cash.accounts.button.add')} <Spreader spread="tiny" /> <FaPlus />
        </Button>
      </Row>
    </Fragment>
  );
};

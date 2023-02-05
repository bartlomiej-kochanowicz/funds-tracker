import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from '__generated__/graphql';
import { StyledCurrencyInput } from './CurrencyInput.styles';

interface CurrencyInputProps {
  currency: Currency;
}

export const CurrencyInput: FC<CurrencyInputProps> = ({ currency }) => {
  const { i18n } = useTranslation();

  return <StyledCurrencyInput intlConfig={{ locale: i18n.language, currency }} />;
};

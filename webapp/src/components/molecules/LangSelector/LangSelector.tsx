import { useTranslation } from 'react-i18next';
import languages from 'constants/selectors/languages';
import { Select } from 'components/atoms';
import { useMemo } from 'react';

export const LangSelector = () => {
  const { t, i18n } = useTranslation();

  const options = useMemo(
    () =>
      languages.map(({ label, ...rest }) => ({
        label: t(label),
        ...rest,
      })),
    [t],
  );

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      options={options}
      defaultValue={i18n.resolvedLanguage}
      onChange={handleChangeLanguage}
    />
  );
};

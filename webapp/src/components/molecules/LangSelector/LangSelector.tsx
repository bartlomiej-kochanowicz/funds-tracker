import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'simple-flexbox';
import languages from 'constants/selectors/languages';
import { Icon, Select, Spreader } from 'components/atoms';
import { FaGlobeEurope } from 'react-icons/fa';

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

  const customLabel = ({ value }: { value: string }) => (
    <Row alignItems="center">
      <Icon icon={FaGlobeEurope} />

      <Spreader spread="small" />

      {t(`selectors.languages.${value}`)}
    </Row>
  );

  return (
    <Select
      options={options}
      defaultValue={i18n.resolvedLanguage}
      onChange={handleChangeLanguage}
      customLabel={customLabel}
      width="fit-content"
    />
  );
};

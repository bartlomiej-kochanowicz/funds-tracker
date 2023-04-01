import { Icon, Select, Spreader } from 'components/atoms';
import languages from 'constants/selectors/languages';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobeEurope } from 'react-icons/fa';
import { Row } from 'simple-flexbox';

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

      <Spreader spread="0.5" />

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

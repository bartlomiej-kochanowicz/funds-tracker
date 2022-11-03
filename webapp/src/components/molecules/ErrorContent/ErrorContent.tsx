import { Text } from 'components/atoms';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSad } from 'react-icons/bi';
import { Column } from 'simple-flexbox';
import { Colors } from 'styles/theme';

export const ErrorContent: FC = () => {
  const { t } = useTranslation();

  return (
    <Column alignItems="center">
      <BiSad
        color={Colors.Error}
        size="32"
      />

      <Text fontWeight="700">{t('error.component.title')}</Text>

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        {t('error.component.description')}
      </Text>
    </Column>
  );
};

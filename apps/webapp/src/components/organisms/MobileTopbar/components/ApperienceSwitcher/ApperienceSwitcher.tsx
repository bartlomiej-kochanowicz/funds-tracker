import { Spreader, Text, ThemeSwitcher } from 'components/atoms';
import { ItemChildrenProps } from 'components/atoms/Menu/MenuItem';
import { ForwardedRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ApperienceWrapper } from './ApperienceSwitcher.styles';

export const ApperienceSwitcher = ({ ref, ...props }: ItemChildrenProps) => {
  const { t } = useTranslation();

  return (
    <ApperienceWrapper
      {...props}
      role="group"
      aria-labelledby={t('common.apperience')}
    >
      <Text id={t('common.apperience')}>{t('common.apperience')}</Text>

      <Spreader />

      <ThemeSwitcher ref={ref as ForwardedRef<HTMLButtonElement>} />
    </ApperienceWrapper>
  );
};

ApperienceSwitcher.displayName = 'ApperienceSwitcher';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LogoHorizontal } from 'assets/logo/logo-name-horizontal.svg';
import { Column } from 'simple-flexbox';
import { Spacer } from 'components/atoms/Spacer';
import { Button } from 'components/atoms/Button';
import { Link } from 'react-router-dom';
import { paths } from 'routes/paths';
import { FullscreenClear } from 'layouts/FullscreenClear';

export const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <FullscreenClear
      justifyContent="center"
      alignItems="center"
      background="secondary"
    >
      <Column alignItems="center">
        <LogoHorizontal width="500px" />

        <Spacer />

        <Button
          size="large"
          as={Link}
          to={paths.login}
        >
          {t('page.welcome.button')}
        </Button>
      </Column>
    </FullscreenClear>
  );
};

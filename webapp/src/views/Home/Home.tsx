import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';
import { Spacer } from 'components/atoms/Spacer';
import { Button } from 'components/atoms/Button';
import { paths } from 'routes/paths';
import { ReactComponent as LogoHorizontal } from 'assets/logo/logo-name-horizontal.svg';
import { StyledFullscreenClear } from './Home.styles';

export const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledFullscreenClear
      justifyContent="center"
      alignItems="center"
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
    </StyledFullscreenClear>
  );
};

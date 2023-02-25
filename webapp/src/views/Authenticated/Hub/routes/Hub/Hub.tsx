import { Heading, Spacer, Tile } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';

import { hubNavigation } from './constants';
import { Grid, Wrapper } from './Hub.styles';

export const Hub = () => {
  const isDesktop = useBreakpoint('desktop', 'min');

  const { t } = useTranslation();

  if (isDesktop) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD.HOME}
        replace
      />
    );
  }

  return (
    <Wrapper>
      <Heading
        level="h3"
        fontColor="gray400"
      >
        {t('common.dashboard')}
      </Heading>

      <Spacer space="small" />

      <Grid>
        {hubNavigation.essentials.map(({ icon, title, to }) => {
          const Icon = icon;

          return (
            <Tile
              key={title}
              title={t(title)}
              to={to}
            >
              <Icon />
            </Tile>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

Hub.displayName = 'Hub';

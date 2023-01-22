import { Heading, Spacer, Tile } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { Column } from 'simple-flexbox';
import { hubNavigation } from './constants';
import { Grid } from './Hub.styles';

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
    <Column>
      <Heading
        level="h3"
        fontColor="gray400"
      >
        Essensials
      </Heading>

      <Spacer space="tiny" />

      <Grid>
        {hubNavigation.essentials.map(({ icon, title }) => {
          const Icon = icon;

          return (
            <Tile
              key={title}
              title={t(title)}
            >
              <Icon />
            </Tile>
          );
        })}
      </Grid>
    </Column>
  );
};

Hub.displayName = 'Hub';

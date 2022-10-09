import { Heading, Spacer } from 'components/atoms';
import { LangSelector } from 'components/molecules/LangSelector';
import { useTranslation } from 'react-i18next';
import { dashboardNavigation } from 'routes/navigation';
import { Column } from 'simple-flexbox';
import { NavList } from './components/NavList';
import { StyledColumn } from './Sidebar.styles';

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <StyledColumn justifyContent="space-between">
      <Column>
        <Heading
          level="h2"
          fontColor="black"
          fontSize="1.25"
        >
          {t('common.dashboard')}
        </Heading>

        <Spacer space="small" />

        <NavList routes={dashboardNavigation} />
      </Column>

      <LangSelector />
    </StyledColumn>
  );
};

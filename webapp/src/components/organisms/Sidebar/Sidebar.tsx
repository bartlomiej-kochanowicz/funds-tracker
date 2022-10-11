import { Heading, Spacer } from 'components/atoms';
import { LangSelector } from 'components/molecules';
import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';
import { NavList } from './components/NavList';
import { sidebarNavigation } from './constants';
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

        <NavList navigation={sidebarNavigation} />
      </Column>

      <LangSelector />
    </StyledColumn>
  );
};

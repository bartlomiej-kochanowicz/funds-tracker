import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';
import { Spacer } from 'components/atoms';
import { bottomBarNavigation } from './constants';
import { List, ListItem, StyledNav, StyledNavLink, Title } from './BottomBar.styles';

export const BottomBar = () => {
  const { t } = useTranslation();

  return (
    <StyledNav>
      <List>
        {bottomBarNavigation.map(({ to, title, icon: Icon }) => (
          <ListItem key={title}>
            <StyledNavLink
              to={to}
              end
            >
              {({ isActive }) => (
                <Column alignItems="center">
                  <Icon size="1.5rem" />

                  <Spacer space="tiny" />

                  <Title
                    fontColor={isActive ? 'text' : 'gray400'}
                    fontWeight={isActive ? '700' : '500'}
                    lineHeight="1rem"
                    textAlign="center"
                    fontSize="0.875"
                  >
                    {t(title)}
                  </Title>
                </Column>
              )}
            </StyledNavLink>
          </ListItem>
        ))}
      </List>
    </StyledNav>
  );
};

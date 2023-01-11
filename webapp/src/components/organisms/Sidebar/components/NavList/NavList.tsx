import { IconType } from 'react-icons';
import { NavListItem } from 'components/organisms/Sidebar/components/NavListItem';
import { List, ListItem, StyledNavLink } from './NavList.styles';

interface NavListProps {
  navigation: { to: string; title: string; icon: IconType }[];
}

export const NavList = ({ navigation }: NavListProps) => (
  <nav>
    <List>
      {navigation.map(({ to, title, icon }) => (
        <ListItem key={title}>
          <StyledNavLink to={to}>
            {({ isActive }) => (
              <NavListItem
                title={title}
                icon={icon}
                isActive={isActive}
                to={to}
              />
            )}
          </StyledNavLink>
        </ListItem>
      ))}
    </List>
  </nav>
);

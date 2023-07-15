import { NavListItem } from 'components/organisms/Sidebar/components/NavListItem';
import { IconType } from 'react-icons';

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
            {(props: { isActive: boolean }) => (
              <NavListItem
                title={title}
                icon={icon}
                {...props}
              />
            )}
          </StyledNavLink>
        </ListItem>
      ))}
    </List>
  </nav>
);

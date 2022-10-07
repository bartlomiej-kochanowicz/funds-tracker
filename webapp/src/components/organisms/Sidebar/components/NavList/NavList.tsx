import { Spreader, Text } from 'components/atoms';
import { Fragment } from 'react';
import { IconType } from 'react-icons';
import { Row } from 'simple-flexbox';
import { Bar, List, ListItem, StyledNavLink } from './NavList.styles';

interface NavListProps {
  routes: { to: string; title: string; icon: IconType }[];
}

export const NavList = ({ routes }: NavListProps) => (
  <nav>
    <List>
      {routes.map(({ to, title, icon: Icon }) => (
        <ListItem key={title}>
          <StyledNavLink
            to={to}
            end
          >
            {({ isActive }) => (
              <Fragment>
                <Row>
                  <Icon size="1.25rem" />

                  <Spreader spread="small" />

                  <Text
                    fontColor={isActive ? 'black' : 'darkGray'}
                    fontWeight={isActive ? '700' : '500'}
                  >
                    {title}
                  </Text>
                </Row>

                {isActive && <Bar />}
              </Fragment>
            )}
          </StyledNavLink>
        </ListItem>
      ))}
    </List>
  </nav>
);

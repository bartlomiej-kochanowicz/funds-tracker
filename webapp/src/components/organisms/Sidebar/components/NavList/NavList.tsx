import { Spreader, Text } from 'components/atoms';
import { Fragment } from 'react';
import { Row } from 'simple-flexbox';
import { Bar, List, ListItem, StyledNavLink } from './NavList.styles';

interface NavListProps {
  routes: { to: string; title: string; icon: any }[];
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
                    fontColor={isActive ? 'black' : 'gray'}
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
